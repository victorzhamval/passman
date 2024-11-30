export default function OutlineInput({ placeholder, name, onChange, value, rows = 5 }) {
  return (
    <textarea
      className="input input--outline input--multiline"
      name={name}
      value={value}
      rows={rows}
      maxLength="255"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

