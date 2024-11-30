export default function Output({ result = '' }) {
  return (
    <div className="password-encryption__output">
      <p className="password-encryption__output-text">{result !== "" ? result : "Output goes here"}</p>
    </div>
  );
}

