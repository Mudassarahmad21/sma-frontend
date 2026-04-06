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
  const [students, setStudents]           = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchStudents();
      setStudents(res.data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (student) => {
    try {
      await createStudent(student);
      loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  const handleUpdate = async (id, student) => {
    try {
      await updateStudent(id, student);
      loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update student");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const handleEdit     = (student) => setSelectedStudent(student);
  const clearSelection = ()        => setSelectedStudent(null);

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

      {loading && <p>Loading students...</p>}
      {error   && <p className="error">{error}</p>}
      {!loading && !error && (
        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;