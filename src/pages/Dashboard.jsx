import React, { useState, useEffect } from "react";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api";
import { getToken, removeToken } from "../auth";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const Dashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const token = getToken();

  const loadStudents = async () => {
    const res = await fetchStudents(token);
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (student) => {
    await createStudent(student, token);
    loadStudents();
  };

  const handleUpdate = async (student) => {
    await updateStudent(student._id, student, token);
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id, token);
    loadStudents();
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
