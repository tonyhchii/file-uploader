const poolInstance = require("../db/pool");

const loadPage = (req, res) => {
  res.render("create-folder-page");
};

const createFolder = async (req, res) => {
  console.log(req.body, req.user);
  await poolInstance.folder.create({
    data: {
      name: req.body.folderName,
      userId: req.user.id,
    },
  });
  res.redirect("/");
};

module.exports = { loadPage, createFolder };
