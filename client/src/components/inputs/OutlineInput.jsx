export default function OutlineInput({ placeholder, name, onChange, value, type = 'text' }) {
  return (
    <input
      className="input input--outline"
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
}

