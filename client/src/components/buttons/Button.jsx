export default function Button({ title, onClick, Icon }) {
  return (
    <button className="button" onClick={onClick}>
      {Icon && <Icon />}
      {title}
    </button>
  );
}

