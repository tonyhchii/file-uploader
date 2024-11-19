const { Router } = require("express");
const fileUploadRouter = Router();
const fileUploadController = require("../controllers/fileUploadController");
const multer = require("multer");
const upload = multer({ dest: "../uploads" });

fileUploadRouter.get("/", fileUploadController.loadPage);
fileUploadRouter.post(
  "/",
  upload.single("file"),
  fileUploadController.uploadFile
);

module.exports = fileUploadRouter;
