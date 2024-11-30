import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UsersAPI from '../../api/UsersAPI';
import Auth from '../../globals/Auth';
import {
  Input,
  Link,
  LabelLogo,
  SecondaryButton,
  Form
} from '../../components';
import './../_auth.scss';

export default function Login() {
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const navigateTo = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUser(old => ({ ...old, [name]: value }));
  }

  async function handleLogin() {
    if (user.username.trim() === '' || user.password === '') {
      setError('All fields are required.');
      return;
    }

    setError('');
    const res = await UsersAPI.login(user.username, user.password);

    if (res.ok) {
      Auth.saveToken(res.json.token);
      navigateTo('/');
    }
  }

  return (
    <div className="auth">
      <div className="auth__logo-wp">
        <LabelLogo />
      </div>
      <Form className="auth__wp">
        <h2>Sign in</h2>
        <Input
          name="username"
          placeholder="Username"
          onChange={handleOnChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleOnChange}
        />
        {error !== "" && <p className="error">{error}</p>}
        <SecondaryButton
          className="button--large"
          title="Sign in"
          onClick={handleLogin}
          type="submit"
          isLarge
        />
        <div className="auth__ca-wp">
          <p>Don"t have an account?</p>
          <Link
            to="/create-account"
            title='Create account'
          />
        </div>
      </Form>
    </div>
  );
}

