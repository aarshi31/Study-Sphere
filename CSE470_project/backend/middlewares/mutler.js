import multer from "multer";  // resume/picture upload

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");