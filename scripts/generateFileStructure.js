import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, "../public/files");
const generateFileStructure = (dirPath) => {
  const stats = fs.statSync(dirPath);
  if (stats.isDirectory()) {
    return {
      name: path.basename(dirPath),
      isFolder: true,
      path: dirPath.replace(path.join(__dirname, "../public"), ""),
      children: fs
        .readdirSync(dirPath)
        .map((child) => generateFileStructure(path.join(dirPath, child))),
    };
  } else {
    return {
      name: path.basename(dirPath),
      isFolder: false,
      path: dirPath.replace(path.join(__dirname, "../public"), ""),
    };
  }
};
const fileStructure = generateFileStructure(directoryPath);
fs.writeFileSync(
  path.join(__dirname, "../public/fileStructure.json"),
  JSON.stringify(fileStructure, null, 2)
);
console.log("File structure JSON generated successfully.");
