const loadPage = (req, res) => {
  res.render("file-upload-page");
};

const uploadFile = (req, res) => {
  res.redirect("/");
  console.log(req.file);
};

module.exports = { loadPage, uploadFile };
