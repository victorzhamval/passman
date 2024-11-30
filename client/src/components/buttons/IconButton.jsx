export default function IconButton({ Icon, onClick, isDisabled = false }) {
  return (
    <button className={`button button--icon ${isDisabled && 'button--disabled'}`} onClick={onClick}>
      <Icon />
    </button>
  )
}
