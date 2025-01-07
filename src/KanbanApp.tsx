import { useContext, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { TasksContext } from "./context/TasksContext";
import { TaskStatus } from "./types";

import Column from "./components/Column";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";
import { LanguageContext } from "./i18n/LanguageContext";
import { SettingsContext } from "./context/SettingsContext";


function KanbanApp() {

  const languageContext = useContext(LanguageContext);
  if (!languageContext) throw new Error('Language Context not found');
  const { t } = languageContext;

  const tasksContext = useContext(TasksContext);
  if (!tasksContext) throw new Error("Tasks Context not found.");

  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) throw new Error("Settings Context not found.");
  const { showReview } = settingsContext;

  const { tasks, moveTask, reorderTasks } = tasksContext;
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: { id: TaskStatus; title: string }[] = [
    { id: "todo" as TaskStatus, title: t('columns.todo') },
    { id: "inProgress" as TaskStatus, title: t('columns.inProgress') },
    ...(showReview ? [{ id: "reviewing" as TaskStatus, title: t('columns.reviewing') }] : []),
    { id: "done" as TaskStatus, title: t('columns.done') },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, //distance before drag starts
      },
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    //dropping over a column
    if (over.data.current?.type === "column") {
      const newStatus = over.id as TaskStatus;
      if (activeTask.status !== newStatus) {
        moveTask(activeId, newStatus);
      }
    }
    //dropping over another task
    else if (overTask && activeTask.status !== overTask.status) {
      moveTask(activeId, overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) {
      setActiveId(null);
      return;
    }

    if (over.data.current?.type === "column") {
      const newStatus = over.id as TaskStatus;
      const targetStatusTasks = tasks.filter((t) => t.status === newStatus);
      reorderTasks(activeId, newStatus, targetStatusTasks.length);
    } 
    //reordering column or moving to a new position in another column
    else {
      const overTask = tasks.find((t) => t.id === overId);
      if (!overTask) {
        setActiveId(null);
        return;
      }

      const targetStatusTasks = tasks.filter((t) => t.status === overTask.status);
      const overIndex = targetStatusTasks.findIndex((t) => t.id === overId);
      reorderTasks(activeId, overTask.status, overIndex);
    }
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null;

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 p-8 relative">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 h-full">
              {columns.map((column) => {
                const columnTasks = tasks.filter(
                  (task) => task.status === column.id
                );
                return (
                  <Column
                    key={column.id}
                    title={column.title}
                    droppableId={column.id}
                    count={columnTasks.length}
                  >
                    <SortableContext items={columnTasks.map((t) => t.id)}>
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                        />
                      ))}
                    </SortableContext>
                  </Column>
                );
              })}
            </div>

            <DragOverlay>
              {activeTask && (
                <TaskCard
                  id={activeTask.id}
                  title={activeTask.title}
                  description={activeTask.description}
                />
              )}
            </DragOverlay>
          </DndContext>
        </div>
        <AlertsPanel />
      </div>
      <Footer />
    </div>
  );
}

export default KanbanApp;