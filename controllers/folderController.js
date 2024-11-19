const poolInstance = require("../db/pool");
const loadPage = async (req, res) => {
  const folder = await poolInstance.folder.findFirst({
    where: { id: Number(req.params.id) },
  });
  const files = await poolInstance.file.findMany({
    where: { folderId: folder.id },
  });
  console.log(files);
  res.render("folder-page", { folder: folder, files: files });
};

module.exports = { loadPage };
