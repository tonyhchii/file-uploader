const loadPage = (req, res) => {
  res.render("create-folder-page");
};

const createFolder = (req, res) => {
  res.redirect("/");
};

module.exports = { loadPage, createFolder };
