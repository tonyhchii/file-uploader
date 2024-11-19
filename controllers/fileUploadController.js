const loadPage = (req, res) => {
  res.render("file-upload-page");
};

const uploadFile = (req, res) => {
  res.redirect("/");
};

module.exports = { loadPage, uploadFile };
