import { useRef, useState } from 'react';

export default function ImagePicker({ accept, label, onChange, name }) {
  const [image, setImage] = useState('');
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.click();
  }

  async function handleOnChange(e) {
    if (e.target.files.length > 0) {
      const pickedImage = e.target.files[0];
      const imageUrl = URL.createObjectURL(pickedImage);
      setImage(imageUrl);
      onChange(e);
    }
  }

  return (
    <div className="avatar-picker" onClick={handleClick}>
      {image.trim() === "" ? <p>{label}</p> : <img className="avatar-picker__image" src={image} />}
      <input
        ref={inputRef}
        name={name}
        className="avatar-picker__input"
        type="file" accept={accept}
        onChange={handleOnChange}
      />
    </div>
  )
}
