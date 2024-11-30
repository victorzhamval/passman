export default function SecondaryButton({ title, Icon, onClick, isLarge = false }) {
  return (
    <button className={`button button--secondary ${isLarge && "button--large"}`} onClick={onClick}>
      {Icon !== undefined && <Icon />}
      {title}
    </button>
  );
}
