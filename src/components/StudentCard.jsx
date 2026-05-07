const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const StudentCard = ({ student, onEdit, onDelete, isEditing }) => (
  <div className={`student-card${isEditing ? " is-editing" : ""}`}>
    <div className="card-avatar">{getInitials(student.name)}</div>
    <div className="card-name" title={student.name}>
      {student.name}
    </div>
    <div className="card-email" title={student.email}>
      {student.email}
    </div>
    <div className="card-course-badge">{student.course}</div>
    <div className="card-actions">
      <button className="btn btn-edit btn-sm" onClick={() => onEdit(student)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 13, height: 13 }}
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Edit
      </button>
      <button
        className="btn btn-danger-ghost btn-sm"
        onClick={() => onDelete(student)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 13, height: 13 }}
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
        Delete
      </button>
    </div>
  </div>
);

export default StudentCard;
