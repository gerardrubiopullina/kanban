import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KanbanApp from './KanbanApp.tsx'
import { TasksProvider } from './context/TasksProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TasksProvider>
        <KanbanApp />
      </TasksProvider>
    </AuthProvider>
  </StrictMode>,
)
