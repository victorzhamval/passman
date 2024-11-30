const fs = require("fs").promises;

const uploadFile = async (dir, name, ext, bytes) => {
  const filePath = `${dir}/${name}.${ext}`;
  const fileBuffer = Buffer.from(bytes)
  await fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) throw new Error("Error uploading file.");
  });
}

const copyFile = async (src, newName) => {
  const newFilePath = src.replace(src.slice(src.lastIndexOf("/") + 1, src.indexOf(".")), newName);
  await fs.copyFile(src, `uploads/${newFilePath}`, null, err => {
    if (err) throw new Error("Error copying file.");
  });
}

const deleteFile = async (fileName) => {
  const fileExists = await fs.stat(fileName).catch(_ => false);
  if (fileExists) {
    await fs.unlink(fileName, err => {
      if (err) throw new Error("Error deleting file.");
    });
  }
}

module.exports = {
  uploadFile,
  copyFile,
  deleteFile
}
