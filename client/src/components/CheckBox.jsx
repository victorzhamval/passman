export default function CheckBox({ title, name, checked, onChange }) {

  function handleOnChange(e) {
    onChange(e);
  }

  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
      />
      <p>{title}</p>
    </div>
  );
}

