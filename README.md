# Kanban Task Manager

A minimalist Kanban board that helps you organize tasks across different stages of completion. Tasks can be easily dragged between columns, with alerts for stagnant items to keep your workflow efficient. Built with React and Firebase, supporting both English and Spanish, with offline capability when not signed in.

🖥️ Live Demo: https://kanban-umber-one.vercel.app/

![image](https://github.com/user-attachments/assets/6b808e1d-a571-4eed-bcb5-59bad83cf7e9)

## Key Features
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Task Management**:
  - Create, delate and edit tasks
  - *Drag-and-drop* task organization
- **Firebase** authentication and real-time data sync
- **Multilingual support**: English and spanish
- **Smart Features**:
  - Stagnant task detection
  - Customizable column visibility
  - Task progress tracking
  - Bulk actions for completed tasks
    
## Tech Stack
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Backend & Authentication
- [DND Kit](https://dndkit.com/) - Drag & Drop Functionality

## Getting Started
### Prerequisites

- Node.js
- npm/yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/gerardrubiopullina/kanban-board.git
cd kanban-board
```
2. Install dependencies
```bash
npm install
# or
yarn install
```
3. Create a .env file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
4. Start the development server
```bash
npm run dev
# or
yarn dev
```
Visit http://localhost:5173 to see the app running.
