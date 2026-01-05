import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where pics will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep original extension
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Export middleware
const upload = (fieldName) =>
  multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
  }).single(fieldName);

export default upload;
