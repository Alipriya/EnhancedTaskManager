import React, { useState, useEffect } from "react";
import "./TaskModal.css";

const AVAILABLE_LABELS = ["bug", "feature", "improvement", "documentation"];

export default function TaskModal({ mode, existingTask, onCancel, onSave }) {
    const [title, setTitle] = useState(existingTask?.title || "");
    const [description, setDescription] = useState(
        existingTask?.description || ""
    );
    const [priority, setPriority] = useState(
        existingTask?.priority || "Low"
    );
    const [labels, setLabels] = useState(existingTask?.labels || []);


    useEffect(() => {
        setTitle(existingTask?.title || "");
        setDescription(existingTask?.description || "");
        setPriority(existingTask?.priority || "Low");
        setLabels(existingTask?.labels || []);
    }, [existingTask]);

    const toggleLabel = (label) => {
        setLabels((prev) =>
            prev.includes(label)
                ? prev.filter((l) => l !== label)
                : [...prev, label]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            alert("Title is required.");
            return;
        }
        onSave({ title, description, priority, labels });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
                <form onSubmit={handleSubmit} className="task-form">
                    <label>
                        Title<span className="required">*</span>:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <label>
                        Priority:
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>

                    <fieldset className="labels-fieldset">
                        <legend>Labels (tags):</legend>
                        <div className="labels-checkboxes">
                            {AVAILABLE_LABELS.map((lbl) => (
                                <label key={lbl} className="label-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={labels.includes(lbl)}
                                        onChange={() => toggleLabel(lbl)}
                                    />
                                    {lbl}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">
                            {mode === "add" ? "Add Task" : "Save Changes"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
