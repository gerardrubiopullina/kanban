import Column from "./components/Column"
import Header from "./components/Header"
import TaskCard from "./components/TaskCard"


const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'reviewing', title: 'Reviewing' },
  { id: 'done', title: 'Done' }
];

function KanbanApp() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <Column key={column.id} title={column.title}>
              <TaskCard 
                title="Sample Task" 
                description="Sample description for testing"
              />
            </Column>
          ))}
        </div>
      </main>
    </div>
  )
}

export default KanbanApp
