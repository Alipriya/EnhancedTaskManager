import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

import Board from "./components/Board";
import Dashboard from "./components/Dashboard";
import FilterSortBar from "./components/FilterSortBar";
import TaskModal from "./components/TaskModal";

import "./index.css";

export default function App() {

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });


  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  const openAddModal = () => {
    setModalMode("add");
    setTaskToEdit(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setModalMode("edit");
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskToEdit(null);
  };

  const addTask = (newTaskData) => {
    const newTask = {
      id: uuidv4(),
      status: "TODO",
      ...newTaskData,
    };
    setTasks((prev) => [...prev, newTask]);
    closeModal();
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    closeModal();
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveTaskToStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };


  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId) return; 

      moveTaskToStatus(draggableId, destination.droppableId);
    },
    [moveTaskToStatus]
  );


  const filteredTasks = tasks.filter((t) => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") return true;
    const inTitle = t.title.toLowerCase().includes(term);
    const inLabels = t.labels.some((lbl) =>
      lbl.toLowerCase().includes(term)
    );
    return inTitle || inLabels;
  });

  return (
    <div className="app-container">
      <header>
        <h1>Enhanced Task Manager</h1>
        <button onClick={openAddModal} className="add-btn">
          + Add Task
        </button>
      </header>

      <FilterSortBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="board-and-dashboard">
        <DragDropContext onDragEnd={onDragEnd}>
          <Board
            tasks={filteredTasks}
            onMove={moveTaskToStatus}
            onEdit={openEditModal}
            onDelete={deleteTask}
          />
        </DragDropContext>
        <Dashboard tasks={tasks} />
      </main>

      {modalOpen && (
        <TaskModal
          mode={modalMode}
          existingTask={taskToEdit}
          onCancel={closeModal}
          onSave={(data) => {
            if (modalMode === "add") addTask(data);
            else updateTask(taskToEdit.id, data);
          }}
        />
      )}
    </div>
  );
}
