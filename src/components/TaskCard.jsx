import "./TaskCard.css";

const PRIORITY_COLORS = {
    High: "#e74c3c",
    Medium: "#f39c12",
    Low: "#27ae60",
};

export default function TaskCard({ task, onMove, onEdit, onDelete }) {
    const nextButton = () => {
        if (task.status === "TODO") {
            return (
                <button
                    className="move-btn"
                    onClick={() => onMove(task.id, "ACTIVE")}
                >
                    → Activate
                </button>
            );
        } else if (task.status === "ACTIVE") {
            return (
                <button
                    className="move-btn"
                    onClick={() => onMove(task.id, "CLOSED")}
                >
                    → Close
                </button>
            );
        }
        return null;
    };

    return (
        <div className="task-card">
            <div
                className="priority-indicator"
                style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
            />
            <div className="task-content">
                <div className="task-header">
                    <strong>{task.title}</strong>
                    <div className="task-actions">
                        <button
                            className="edit-btn"
                            onClick={() => onEdit(task)}
                            title="Edit task"
                        >
                            ✎
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(task.id)}
                            title="Delete task"
                        >
                            🗑
                        </button>
                    </div>
                </div>
                {task.description && (
                    <p className="task-desc">{task.description}</p>
                )}
                <div className="labels-container">
                    {task.labels.map((lbl) => (
                        <span key={lbl} className="label-badge">
                            {lbl}
                        </span>
                    ))}
                </div>
                <div className="task-footer">{nextButton()}</div>
            </div>
        </div>
    );
}
