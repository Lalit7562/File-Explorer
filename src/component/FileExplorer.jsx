import React, { useState, useEffect } from "react";
import FileOperations from "./FIleOperation";
import Tree from "./Tree";

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    fetch("/fileStructure.json")
      .then((res) => res.json())
      .then((data) => setFileSystem(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    if (!file.isFolder) {
      if (isImage(file.path)) {
        // If the file is an image, set the file content to the image path
        setFileContent(file.path);
      } else {
        alert("Unable to view this file bcoz this is doc file or music file");
        // If the file is not an image, fetch its content as text
        // fetch(file.path)
        //   .then((res) => res.text())
        //   .then((data) => setFileContent(data))
        //   .catch((err) => console.error(err));
      }
    }
  };

  const isImage = (path) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(path);
  };

  const findFile = (path, data) => {
    if (data.path === path) return data;
    if (data.children) {
      for (let child of data.children) {
        const result = findFile(path, child);
        if (result) return result;
      }
    }
    return null;
  };

  const updateFileSystem = (data, path, updatedFile) => {
    if (data.path === path) {
      return { ...updatedFile };
    }
    if (data.children) {
      return {
        ...data,
        children: data.children.map((child) =>
          updateFileSystem(child, path, updatedFile)
        ),
      };
    }
    return data;
  };

  const renameFile = (path, newName) => {
    alert(
      "Client side JS does not have an access to files and folders on user's pc, either we can use backend or electron JS. Alternatively, we can use local storage to save files locally"
    );
    // const updatedFile = {
    //   ...findFile(path, fileSystem),
    //   name: newName,
    //   path: path.replace(/[^/]+$/, newName),
    // };
    // setFileSystem(updateFileSystem(fileSystem, path, updatedFile));
  };

  const deleteFile = (path) => {
    alert(
      "Client side JS does not have an access to files and folders on user's pc, either we can use backend or electron JS. Alternatively, we can use local storage to save files locally"
    );
    // const removeFile = (data, path) => {
    //   if (data.path === path) return null;
    //   if (data.children) {
    //     data.children = data.children
    //       .map((child) => removeFile(child, path))
    //       .filter((child) => child !== null);
    //   }
    //   return data;
    // };
    // setFileSystem(removeFile(fileSystem, path));
    // setSelectedFile(null);
  };

  if (!fileSystem) return <div>Loading...</div>;
  return (
    <div className="file-explorer">
      <Tree data={fileSystem} onFileClick={handleFileClick} />
      <div className="file-content">
        {selectedFile ? (
          <div>
            <h2>{selectedFile.name}</h2>
            {!selectedFile.isFolder && isImage(selectedFile.path) ? (
              <img src={fileContent} alt={selectedFile.name} />
            ) : (
              <pre>{fileContent}</pre>
            )}
            <FileOperations
              file={selectedFile}
              renameFile={renameFile}
              deleteFile={deleteFile}
            />
          </div>
        ) : (
          <div>Select a file to view its content</div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
