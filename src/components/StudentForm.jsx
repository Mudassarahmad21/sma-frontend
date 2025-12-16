import { useState, useEffect } from "react";

const StudentForm = ({
  addStudent,
  selectedStudent,
  updateStudent,
  clearSelection,
}) => {
  const [student, setStudent] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    if (selectedStudent) setStudent(selectedStudent);
  }, [selectedStudent]);

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudent(student._id, student);
      clearSelection();
    } else {
      addStudent(student);
    }
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
          onClick={() => {
            clearSelection();
            setStudent({ name: "", email: "", course: "" });
          }}
          style={{ marginLeft: "10px", backgroundColor: "#6c757d" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;
