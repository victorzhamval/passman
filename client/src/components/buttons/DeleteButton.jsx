export default function DeleteButton({ title, Icon, onClick, isLarge = false }) {
  return (
    <button className={`button button--delete ${isLarge && "button--large"}`} onClick={onClick}>
      {Icon && <Icon />}
      {title}
    </button>
  );
}

