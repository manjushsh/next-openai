import fs from "fs";

const fsPromises = require("fs").promises;

const FileOperationService = {
  readAFile: async ({ name = "newfile", type = "txt" }) => {
    return await fsPromises
      .readFile(`${name}.${type}`, "utf8")
      .catch((err: any) => console.error("Failed to read file", err));
  },
  createFile: async ({ name = "newfile", type = "txt", content = "" }) => {
    fs.writeFile(`${name}.${type}`, content, (err) => {
      if (err) throw err;
    });
  },
  createOrUpdateFile: async ({
    name = "newfile",
    type = "txt",
    content = "",
  }) => {
    fs.appendFile(`${name}.${type}`, content, (err) => {
      if (err) throw err;
    });
  },
};

export default FileOperationService;
