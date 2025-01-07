import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import KanbanApp from './KanbanApp.tsx'
import { LanguageProvider } from './i18n/LanguageProvider.tsx'
import { TasksProvider } from './context/TasksProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

import './index.css'
import { SettingsProvider } from './context/SettingsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
          <TasksProvider>
            <SettingsProvider>
              <KanbanApp />
            </SettingsProvider>
          </TasksProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
