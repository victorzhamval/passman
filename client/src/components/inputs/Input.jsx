export default function Input({ placeholder, onChange, name, type = '' }) {

  return (
    <input
      className="input"
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange} />
  );
}

