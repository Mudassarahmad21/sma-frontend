import { useEffect } from "react";

const Toast = ({ toasts, onRemove }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <ToastItem key={t.id} toast={t} onRemove={onRemove} />
    ))}
  </div>
);

const ToastItem = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`toast toast-${toast.type}`}
      onClick={() => onRemove(toast.id)}
    >
      <span className="toast-icon">{toast.type === "success" ? "✓" : "✕"}</span>
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
