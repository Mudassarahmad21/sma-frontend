import { useState, useEffect, useCallback } from "react";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api";
import StudentForm from "../components/StudentForm";
import StudentCard from "../components/StudentCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

let toastId = 0;

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const addToast = (message, type = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchStudents();
      setStudents(res.data);
    } catch {
      setError("Failed to load students. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Filter + sort
  useEffect(() => {
    let list = [...students];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q),
      );
    }
    if (sort === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sort === "oldest")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sort === "name-az")
      list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-za")
      list.sort((a, b) => b.name.localeCompare(a.name));
    setFiltered(list);
  }, [students, search, sort]);

  const handleAdd = async (data) => {
    try {
      await createStudent(data);
      await loadStudents();
      addToast("Student added successfully!");
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to add student", "error");
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateStudent(id, data);
      await loadStudents();
      addToast("Student updated successfully!");
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to update student",
        "error",
      );
      throw err;
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteStudent(id);
      await loadStudents();
      setToDelete(null);
      if (selectedStudent?._id === id) setSelectedStudent(null);
      addToast("Student deleted.");
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to delete student",
        "error",
      );
      setToDelete(null);
    }
  };

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-logo">
          <div className="header-logo-mark">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="header-title">Student Management</div>
            <div className="header-subtitle">Records System</div>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-chip">
            <div className="stat-chip-value">{students.length}</div>
            <div className="stat-chip-label">Total Students</div>
          </div>
          <div
            className="divider"
            style={{ width: 1, height: 32, background: "var(--border)" }}
          />
          {/* Unique courses count */}
          <div className="stat-chip">
            <div className="stat-chip-value">
              {new Set(students.map((s) => s.course)).size}
            </div>
            <div className="stat-chip-label">Courses</div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="main-content">
        {/* Sidebar: form */}
        <aside className="sidebar">
          <div className="section-label">Student Form</div>
          <StudentForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            selectedStudent={selectedStudent}
            onClearSelection={() => setSelectedStudent(null)}
          />
        </aside>

        {/* List panel */}
        <main className="list-panel">
          <div className="list-header">
            <div className="list-heading">All Students</div>
            {!loading && (
              <span className="count-badge">
                {filtered.length}
                {filtered.length !== students.length
                  ? ` / ${students.length}`
                  : ""}
              </span>
            )}
          </div>

          {/* Toolbar */}
          <div className="list-toolbar">
            <div className="search-wrapper">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="search-input"
                type="text"
                placeholder="Search by name, email or course…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name-az">Name A → Z</option>
              <option value="name-za">Name Z → A</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="error-banner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 16, height: 16, flexShrink: 0 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="loading-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton sk-avatar" />
                  <div className="skeleton sk-name" />
                  <div className="skeleton sk-email" />
                  <div className="skeleton sk-badge" />
                  <div className="skeleton sk-btns" />
                </div>
              ))}
            </div>
          )}

          {/* Student cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="students-grid">
              {filtered.map((s) => (
                <StudentCard
                  key={s._id}
                  student={s}
                  isEditing={selectedStudent?._id === s._id}
                  onEdit={(student) => {
                    setSelectedStudent(student);
                    // scroll sidebar to top on mobile
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onDelete={(student) => setToDelete(student)}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <div className="empty-title">
                {search ? "No results found" : "No students yet"}
              </div>
              <div className="empty-desc">
                {search
                  ? `No students match "${search}". Try a different search.`
                  : "Add your first student using the form on the left."}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        student={toDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setToDelete(null)}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Dashboard;
