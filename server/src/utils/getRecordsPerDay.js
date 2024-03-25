import mongoose from "mongoose";

export const getRecordsPerDay = async (collectionName) => {
  const db = mongoose.connection;
  const firstRecordCreatedAt = await db
    .collection(collectionName)
    .find({}, { createdAt: 1 })
    .sort({ createdAt: 1 })
    .limit(1)
    .toArray();

  console.log(firstRecordCreatedAt);
  const lastRecordCreatedAt = await db
    .collection(collectionName)
    .findOne({}, { createdAt: 1 })
    .sort({ createdAt: -1 });

  const allDates = [];
  let currentDate = moment(firstRecordCreatedAt.createdAt);
  const lastDate = moment(lastRecordCreatedAt.createdAt);
  while (currentDate.isSameOrBefore(lastDate, "day")) {
    allDates.push(currentDate.toDate());
    currentDate = currentDate.add(1, "day");
  }

  const recordsPerDayCursor = await db.collection(collectionName).aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);

  const recordsPerDayMap = new Map();
  recordsPerDayCursor.forEach(({ _id, count }) => {
    recordsPerDayMap.set(_id, count);
  });

  const allRecordsPerDay = allDates.map((date) => ({
    _id: date,
    count: recordsPerDayMap.get(moment(date).format("YYYY-MM-DD")) || 0,
  }));

  return allRecordsPerDay;
};
