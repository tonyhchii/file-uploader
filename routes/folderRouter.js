const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/:id", folderController.loadPage);

module.exports = folderRouter;
