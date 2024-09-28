import { useState } from 'react';
import { Trash2, Check, X, File, Pencil, CirclePlus } from "lucide-react"
import { iTreeNode } from './TreeNode.interface';
import styles from './TreeNode.module.css';


interface TreeNodeProps {
  node: iTreeNode
  onUpdate: (updatedNode: iTreeNode) => void
  onDelete: () => void
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(node.name)
  const [isAddingChild, setIsAddingChild] = useState(false)
  const [newChildName, setNewChildName] = useState("")
  const [newChildType, setNewChildType] = useState<"file" | "folder">("file")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggle = () => setIsExpanded(!isExpanded)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate({ ...node, name: editedName })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(node.name)
    setIsEditing(false)
  }

  const handleAddChild = (type: "file" | "folder") => {
    setIsAddingChild(true)
    setNewChildType(type)
    setIsDropdownOpen(false)
  }

  const handleSaveNewChild = () => {
    const newChild: iTreeNode = {
      id: Math.random().toString(36).substr(2, 9),
      name: newChildName,
      type: newChildType,
      children: newChildType === "folder" ? [] : undefined,
    }
    onUpdate({ ...node, children: [...(node.children || []), newChild] })
    setNewChildName("")
    setIsAddingChild(false)
    setIsExpanded(true)
  }

  const handleCancelAddChild = () => {
    setNewChildName("")
    setIsAddingChild(false)
  }

  const isFolder = node.type === "folder"

  return (
    <div className={styles.treeNode}>
      <div className={styles.nodeContent}>
        <div className={styles.nodeInfo}>
          {isFolder && (
            <button className={styles.toggleButton} onClick={handleToggle}>
              {isExpanded ? (
                <img src="folder_open.svg" alt="folder" height='18px'/>
                // <FolderOpen className={`${styles.icon} ${styles.folderIcon}`} />
              ) : (
                <img src="folder_closed.svg" alt="folder" height='18px'/>
                // <FolderClosed className={`${styles.icon} ${styles.folderIcon}`} />
              )}
            </button>
          )} 
          {!isFolder && (
            <img src="task_icon.svg" alt="folder" height='18px'/>
            // <File className={`${styles.icon} ${styles.fileIcon}`} />
          )}
          {isEditing ? (
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={styles.input}
            />
          ) : (
            <span onClick={handleToggle} className={styles.nodeName}>
              {node.name}
            </span>
          )}
        </div>


        <div className={styles.actionButtons}>
          {isEditing ? (
            <>
              <button className={styles.actionButton} onClick={handleSave}>
                <Check className={styles.icon} />
              </button>
              <button className={styles.actionButton} onClick={handleCancel}>
                <X className={styles.icon} />
              </button>
            </>
          ) : (
            <>
              <div className={styles.actionButton} >
                <button className={styles.actionButton} onClick={handleEdit}>
                  <img src="pencil.svg" alt="folder" height='14px'/>
                  {/* <Pencil className={styles.icon} /> */}
                </button>
              </div>
              <div className={styles.dropdownMenu}>
                <button className={styles.actionButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <CirclePlus className={styles.icon} />
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <div className={styles.dropdownItem} onClick={() => handleAddChild("file")}>
                      Add File
                    </div>
                    <div className={styles.dropdownItem} onClick={() => handleAddChild("folder")}>
                      Add Folder
                    </div>
                  </div>
                )}
              </div>
              <button className={styles.actionButton} onClick={onDelete}>
                <Trash2 className={styles.icon} />
              </button>
            </>
          )}
        </div>


      </div>
      {isAddingChild && (
        <div className={styles.nodeContent}>
          <input
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            placeholder={`New ${newChildType} name`}
            className={styles.input}
          />
          <button className={styles.actionButton} onClick={handleSaveNewChild}>
            <Check className={styles.icon} />
          </button>
          <button className={styles.actionButton} onClick={handleCancelAddChild}>
            <X className={styles.icon} />
          </button>
        </div>
      )}
      {isExpanded && node.children && (
        <div className={styles.childrenContainer}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onUpdate={(updatedChild) => {
                const updatedChildren = node.children!.map((c) =>
                  c.id === updatedChild.id ? updatedChild : c
                )
                onUpdate({ ...node, children: updatedChildren })
              }}
              onDelete={() => {
                const updatedChildren = node.children!.filter((c) => c.id !== child.id)
                onUpdate({ ...node, children: updatedChildren })
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
