import React, { useState } from "react";
const FileOperations = ({ file, renameFile, deleteFile }) => {
  const [newName, setNewName] = useState(file.name);
  const handleRename = () => {
    renameFile(file.path, newName);
  };
  const handleDelete = () => {
    deleteFile(file.path);
  };
  return (
    <div className="file-operations">
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleRename}>Rename</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default FileOperations;
