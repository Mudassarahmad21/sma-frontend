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

const Dashboard = ({ token, onLogout }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await fetchStudents(token);
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  const handleAdd = async (student) => {
    try {
      await createStudent(student, token);
      loadStudents();
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleUpdate = async (id, student) => {
    try {
      await updateStudent(id, student, token);
      loadStudents();
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id, token);
        loadStudents();
      } catch (error) {
        console.error("Failed to delete student:", error);
      }
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
