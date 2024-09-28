import { iTreeNode } from './EditableTreeView/TreeNode.interface'
import { EditableTreeView } from './EditableTreeView/EditableTreeView'
import { useState } from 'react'

export const TreeViewExample = () => {

  const [treeData, setTreeData] = useState<iTreeNode>({
    id: "root",
    name: "Root",
    type: "folder",
    children: [
      {
        id: "1",
        name: "Documents",
        type: "folder",
        children: [
          { id: "1.1", name: "Report.docx", type: "file" },
          { id: "1.2", name: "Spreadsheet.xlsx", type: "file" },
        ],
      },
      { id: "2", name: "Images", type: "folder", children: [] },
      {
        id: "3",
        name: "Projects",
        type: "folder",
        children: [
          { id: "3.1", name: "Project A", type: "folder", children: [] },
          { id: "3.2", name: "Project B", type: "folder", children: [] },
        ],
      },
    ],
  })

  const handleUpdate = (updatedNode: iTreeNode) => {
    setTreeData(updatedNode)
  }

  return (
    <div>
      <EditableTreeView treeData={treeData} handleUpdate={handleUpdate} />
    </div>
  )
}
