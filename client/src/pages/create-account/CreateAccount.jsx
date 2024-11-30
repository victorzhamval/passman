import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersAPI from '../../api/UsersAPI';
import ObjectUtils from '../../utils/ObjectUtils';
import {
  Form,
  LabelLogo,
  SecondaryButton,
  Input,
  Link,
  ImagePicker
} from '../../components';
import './../_auth.scss';

export default function CreateAccount() {
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: '',
    repPassword: '',
    profileImage: {
      bytes: [],
      type: ''
    }
  })

  const navigateTo = useNavigate();

  function handleOnChangeInput(e) {
    const { name, value } = e.target;
    setUser(old => ({ ...old, [name]: value }));
  }

  async function handleOnChangePicker(e) {
    const { name, files } = e.target;
    const image = files[0];
    const imageBuffer = await image.arrayBuffer();
    const bytes = new Uint8Array(imageBuffer).toString().split(',');

    const image_obj = {
      bytes: bytes,
      name: image.name,
      type: image.type
    }

    setUser(old => ({ ...old, [name]: image_obj }));
  }

  async function handleCreateAccount() {
    const isFilled = ObjectUtils.isFilled(user, 'profileImage');

    if (!isFilled) {
      setError('Please, fill in the required fields.');
      return;
    }

    const passwordsMatches = user.password.trim() === user.repPassword.trim();
    if (!passwordsMatches) {
      setError('Passwords don\'t match.');
      return;
    }

    setError('');
    const res = await UsersAPI.add(user.username, user.password, user.profileImage);
    if (res.ok) {
      navigateTo('/login');
    }
  }

  return (
    <div className='auth'>
      <div className="auth__logo-wp">
        <LabelLogo />
      </div>
      <Form className="auth__wp">
        <h2>Create account</h2>
        <Input
          name="username"
          placeholder='Username'
          onChange={handleOnChangeInput}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleOnChangeInput}
        />
        <Input
          name="repPassword"
          placeholder='Repeat password'
          type="password"
          onChange={handleOnChangeInput}
        />
        <ImagePicker
          name="profileImage"
          accept="image/*"
          label="Choose profile picture"
          onChange={handleOnChangePicker}
        />
        {error !== "" && <p className="error">{error}</p>}
        <SecondaryButton
          title="Create account"
          onClick={handleCreateAccount}
          isLarge={true}
          type="submit"
        />
        <div className="auth__ca-wp">
          <p>Already have an account?</p>
          <Link to="/login" title="Sign In"/>
        </div>
      </Form>
    </div>
  );
}

