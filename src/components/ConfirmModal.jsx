const ConfirmModal = ({ student, onConfirm, onCancel }) => {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>
        <div className="modal-title">Delete Student?</div>
        <p className="modal-desc">
          This will permanently remove{" "}
          <strong style={{ color: "var(--text)" }}>{student.name}</strong> from
          the system. This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-confirm-danger"
            onClick={() => onConfirm(student._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
