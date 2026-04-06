import { useState, useEffect } from "react";

const StudentForm = ({ addStudent, selectedStudent, updateStudent, clearSelection }) => {
  const [student, setStudent] = useState({ name: "", email: "", course: "" });

  // When a student is selected for editing, populate the form
  useEffect(() => {
    if (selectedStudent) {
      setStudent({
        name:   selectedStudent.name,
        email:  selectedStudent.email,
        course: selectedStudent.course,
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      // Only send name, email, course — not _id or other mongo fields
      updateStudent(selectedStudent._id, {
        name:   student.name,
        email:  student.email,
        course: student.course,
      });
      clearSelection();
    } else {
      addStudent(student);
    }
    setStudent({ name: "", email: "", course: "" });
  };

  const handleCancel = () => {
    clearSelection();
    setStudent({ name: "", email: "", course: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {selectedStudent ? "Update Student" : "Add Student"}
      </button>
      {selectedStudent && (
        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: "10px", backgroundColor: "#6c757d" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;