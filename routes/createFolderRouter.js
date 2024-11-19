const { Router } = require("express");
const createFolderRouter = Router();
const createFolderController = require("../controllers/createFolderController");

createFolderRouter.get("/", createFolderController.loadPage);
createFolderRouter.post("/", createFolderController.createFolder);

module.exports = createFolderRouter;
