const { Router } = require("express");
const fileUploadRouter = Router();
const fileUploadController = require("../controllers/fileUploadController");

fileUploadRouter.get("/", fileUploadController.loadPage);
fileUploadRouter.post("/", fileUploadController.uploadFile);

module.exports = fileUploadRouter;
