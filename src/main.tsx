import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KanbanApp from './KanbanApp.tsx'
import { TasksProvider } from './context/TasksProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksProvider>
      <KanbanApp />
    </TasksProvider>
  </StrictMode>,
)
