
export default function PasswordGeneratorSection({ title, children }) {
  return (
    <div className="password-generator__section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

