// import multer from 'multer'

import multer from "multer";

const storage = multer.memoryStorage()
export const upload = multer({ dest: "uploads/" })


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // ensure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });