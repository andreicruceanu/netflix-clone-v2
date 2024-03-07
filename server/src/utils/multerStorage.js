import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadOptions = multer({ storage: storage }).fields([
  { name: "poster", maxCount: 1 },
  { name: "backdrop", maxCount: 1 },
]);
export { storage, uploadOptions };
