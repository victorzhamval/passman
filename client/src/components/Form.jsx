export default function Form({ children, className }) {

  function handleOnSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      className={`form ${className}`} onSubmit={handleOnSubmit}>
      {children}
    </form>
  );
}

