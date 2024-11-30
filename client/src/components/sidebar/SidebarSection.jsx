export default function SidebarSection({ label, children }) {
  return (
    <div className="sidebar__section">
      <small className="sidebar__section-label">
        {label}
      </small>
      {children}
    </div>
  );
}

