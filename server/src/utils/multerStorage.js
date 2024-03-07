import multer from "multer";
import crypto from "crypto";
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File", file);
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/images");
    console.log("is OK");
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${crypto.randomBytes(6).toString("hex")}.${extension}`);
    console.log("is Good", file, cb);
  },
});
const uploadOptions = multer({ storage: storage }).fields([
  { name: "poster", maxCount: 1 },
  { name: "backdrop", maxCount: 1 },
]);
export { storage, uploadOptions };
