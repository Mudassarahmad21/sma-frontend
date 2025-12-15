import React from "react";

const StudentItem = ({ student, onEdit, onDelete }) => (
  <tr>
    <td>{student.name}</td>
    <td>{student.email}</td>
    <td>{student.course}</td>
    <td>
      <button className="edit-btn" onClick={() => onEdit(student)}>
        Edit
      </button>
      <button className="delete-btn" onClick={() => onDelete(student._id)}>
        Delete
      </button>
    </td>
  </tr>
);

export default StudentItem;
