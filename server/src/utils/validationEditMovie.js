import validateDataFromUser from "./userValidation.js";

export const validationEditMovie = (req) => {
  const movieFormatted = {
    ...req.body,
    budget: Number(req.body?.budget),
    revenue: Number(req.body?.revenue),
    adult: Boolean(req.body?.adult),
    genre_ids: !Array.isArray(req.body?.genre_ids)
      ? req.body?.genre_ids.split(",")
      : req.body?.genre_ids,
  };

  const validationResult = validateDataFromUser.editMovie({
    ...movieFormatted,
  });

  if (validationResult.error) {
    return { errorMessage: validationResult.error.details[0].message };
  }

  // if (!req.files.poster && !req.files.backdrop) {
  //   return { errorMessage: "Images is required" };
  // }

  return false;
};
