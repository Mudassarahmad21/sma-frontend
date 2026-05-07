import { useState, useEffect } from "react";

const EMPTY = { name: "", email: "", course: "" };

const validateForm = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email";
  if (!data.course.trim()) errors.course = "Course is required";
  return errors;
};

const StudentForm = ({
  onAdd,
  onUpdate,
  selectedStudent,
  onClearSelection,
}) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(selectedStudent);

  useEffect(() => {
    if (selectedStudent) {
      setForm({
        name: selectedStudent.name,
        email: selectedStudent.email,
        course: selectedStudent.course,
      });
      setErrors({});
    } else {
      setForm(EMPTY);
      setErrors({});
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await onUpdate(selectedStudent._id, form);
        onClearSelection();
      } else {
        await onAdd(form);
      }
      setForm(EMPTY);
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClearSelection();
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <div>
      <div className="form-title">
        {isEditing ? (
          <>
            <span>Edit</span> Student
          </>
        ) : (
          <>
            Add <span>New</span> Student
          </>
        )}
      </div>
      <p className="form-description">
        {isEditing
          ? `Editing record for ${selectedStudent.name}`
          : "Fill in the details below to register a new student."}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className={`form-input${errors.name ? " error-input" : ""}`}
            type="text"
            name="name"
            placeholder="e.g. Ali Hassan"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className={`form-input${errors.email ? " error-input" : ""}`}
            type="email"
            name="email"
            placeholder="e.g. ali@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        {/* Course */}
        <div className="form-group">
          <label className="form-label">Course</label>
          <input
            className={`form-input${errors.course ? " error-input" : ""}`}
            type="text"
            name="course"
            placeholder="e.g. Computer Science"
            value={form.course}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.course && (
            <span className="field-error">{errors.course}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {/* Plus / Save icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isEditing ? (
                <>
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </>
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </>
              )}
            </svg>
            {loading ? "Saving…" : isEditing ? "Update Student" : "Add Student"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancel}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
