import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./Board.css";
import TaskCard from "./TaskCard";

const STATUSES = ["TODO", "ACTIVE", "CLOSED"];

export default function Board({ tasks, onMove, onEdit, onDelete }) {
    return (
        <div className="board">
            {STATUSES.map((status) => (
                <Droppable droppableId={status} key={status}>
                    {(provided, snapshot) => (
                        <div
                            className={`column ${snapshot.isDraggingOver ? "column-drag-over" : ""
                                }`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2>{status}</h2>
                            {tasks
                                .filter((t) => t.status === status)
                                .map((t, index) => (
                                    <Draggable
                                        draggableId={t.id}
                                        index={index}
                                        key={t.id}
                                    >
                                        {(prov, snap) => (
                                            <div
                                                ref={prov.innerRef}
                                                {...prov.draggableProps}
                                                {...prov.dragHandleProps}
                                                className={`task-draggable ${snap.isDragging ? "dragging" : ""
                                                    }`}
                                            >
                                                <TaskCard
                                                    task={t}
                                                    onMove={onMove}
                                                    onEdit={onEdit}
                                                    onDelete={onDelete}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </div>
    );
}
