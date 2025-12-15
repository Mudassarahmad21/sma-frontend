import React from "react";
import StudentItem from "./StudentItem";

const StudentList = ({ students, onEdit, onDelete }) => {
  if (!students.length) return <p>No students found.</p>;

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <StudentItem
            key={s._id}
            student={s}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
