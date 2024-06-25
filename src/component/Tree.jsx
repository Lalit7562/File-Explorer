import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";
const Tree = ({ data, onFileClick, path = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);
  const fullPath = `${path}/${data.name}`;
  return (
    <div className="tree">
      <div
        className="tree-node"
        onClick={() =>
          data.isFolder
            ? handleExpand()
            : onFileClick({ ...data, path: fullPath })
        }
      >
        {data.isFolder ? (
          expanded ? (
            <FaFolderOpen />
          ) : (
            <FaFolder />
          )
        ) : (
          <FaFile />
        )}
        {data.name}
      </div>
      {expanded && data.isFolder && data.children && (
        <div className="tree-children">
          {data.children.map((child, index) => (
            <Tree
              key={index}
              data={child}
              onFileClick={onFileClick}
              path={fullPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Tree;
