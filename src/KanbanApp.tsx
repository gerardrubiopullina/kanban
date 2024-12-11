import { useContext } from "react";
import Column from "./components/Column"
import Header from "./components/Header"
import TaskCard from "./components/TaskCard"
import { TasksContext } from "./context/TasksContext";
import { DndContext, DragEndEvent, DragOverEvent, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskStatus } from "./types";

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'reviewing', title: 'Reviewing' },
  { id: 'done', title: 'Done' }
];

function KanbanApp() {

  const tasksContext = useContext(TasksContext);
  if (!tasksContext) throw new Error('Tasks Context not found.');

  const { tasks, moveTask, reorderTasks } = tasksContext;
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      },
    })
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    const activeTask = tasks.find(t => t.id === Number(activeId));
    const overTask = tasks.find(t => t.id === Number(overId));

    if (!activeTask) return;

    //task over a different column from the original
    if (over.data?.current?.type === 'column') {
      const newStatus = over.id as TaskStatus;
      if (activeTask.status !== newStatus) {
        moveTask(Number(activeId), newStatus);
      }
    }
    //task over a different task
    else if (overTask && activeTask.status !== overTask.status) {
      moveTask(Number(activeId), overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);
    
    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    if (over.data?.current?.type === 'column') {
      const newStatus = over.id as TaskStatus;
      const targetStatusTasks = tasks.filter(t => t.status === newStatus);
      reorderTasks(activeId, newStatus, targetStatusTasks.length);
    } else {
      const overTask = tasks.find(t => t.id === overId);
      if (!overTask) return;

      const targetStatusTasks = tasks.filter(t => t.status === overTask.status);
      const overIndex = targetStatusTasks.findIndex(t => t.id === overId);
      reorderTasks(activeId, overTask.status, overIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DndContext 
          sensors={sensors}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 pb-4">
            {columns.map(column => (
              <div key={column.id} id={column.id} className="flex-1">
                <Column 
                  title={column.title}
                  droppableId={column.id}
                >
                  <SortableContext
                    items={tasks.filter(task => task.status === column.id).map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {tasks
                      .filter(task => task.status === column.id)
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                        />
                      ))}
                  </SortableContext>
                </Column>
              </div>
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  );
}

export default KanbanApp