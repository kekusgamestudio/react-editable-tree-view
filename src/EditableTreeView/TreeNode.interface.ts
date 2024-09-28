export interface iTreeNode {
  id: string
  name: string
  type: "file" | "folder"
  children?: iTreeNode[]
}

