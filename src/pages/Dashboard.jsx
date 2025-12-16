import { useState, useEffect } from "react";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api";
import { removeToken } from "../auth";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const Dashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await fetchStudents();
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (student) => {
    await createStudent(student);
    loadStudents();
  };

  const handleUpdate = async (id, student) => {
    await updateStudent(id, student);
    loadStudents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  const handleEdit = (student) => setSelectedStudent(student);
  const clearSelection = () => setSelectedStudent(null);

  const logout = () => {
    removeToken();
    onLogout();
  };

  return (
    <div className="dashboard">
      <h1>Student Management Dashboard</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <StudentForm
        addStudent={handleAdd}
        selectedStudent={selectedStudent}
        updateStudent={handleUpdate}
        clearSelection={clearSelection}
      />

      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
