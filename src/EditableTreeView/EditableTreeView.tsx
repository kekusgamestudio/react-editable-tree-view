import styles from './EditableTreeView.module.css';
import { TreeNode } from './TreeNode';
import { iTreeNode } from './TreeNode.interface';

interface EditableTreeViewProps {
  treeData: iTreeNode;
  handleUpdate: (node: iTreeNode) => void;
}

export const EditableTreeView: React.FC<EditableTreeViewProps> = ({ treeData, handleUpdate }) => {  return (
    <div className={styles.treeView}>
      <h2 className={styles.title}>Editable Tree View</h2>
      <div className={styles.container}>
        <TreeNode
          node={treeData}
          onUpdate={handleUpdate}
          onDelete={() => {}}
        />
      </div>
    </div>
  )
}


