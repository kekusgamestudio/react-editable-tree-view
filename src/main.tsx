import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TreeViewExample } from './TreeViewExample'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TreeViewExample />
  </StrictMode>,
)
