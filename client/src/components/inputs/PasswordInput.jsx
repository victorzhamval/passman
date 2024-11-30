import { useState } from 'react';
import { HideIcon, ShowIcon } from '../../globals/Icons';

export default function PasswordInput({ name, placeholder, onChange }) {

  const [isVisible, setVisibility] = useState(false);

  return (
    <div className="input-wp">
      <input
        className="input input--password"
        name={name}
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        onChange={onChange}
      />
      <div className='input__visibility' onClick={() => setVisibility(!isVisible)}>
        {isVisible ? <HideIcon /> : <ShowIcon />}
      </div>
    </div>
  )
}
