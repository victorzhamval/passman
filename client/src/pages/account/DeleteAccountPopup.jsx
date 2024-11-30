import { useState } from 'react';
import { DeleteButton, OutlineInput, Form } from '../../components';
import UsersAPI from '../../api/UsersAPI';
import { PopupUtils } from '../../utils';
import { navigate } from '../../globals/refs';
import Auth from '../../globals/Auth';

const DeleteUserPopup = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOnChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }

  const handleDeleteUser = async () => {
    if (password === '') {
      setError('All fields are required.')
      return;
    }

    setError('');
    const res = await UsersAPI.delete(password);
    if (res.ok) {
      Auth.deleteToken();
      navigate.current('/login');
    }
  }

  return (
    <div className="popup">
      <div className="popup__bg" onClick={PopupUtils.closePopup}></div>
      <div className="popup__window popup__window--centered">
        <Form>
          <div className="popup__header">
            <h2>Are you sure?</h2>
            <p>{`Your account and its data will be deleted forever.`}</p>
          </div>
          <OutlineInput
            name="password"
            type="password"
            placeholder="Your password"
            onChange={handleOnChange}
          />
          {error != "" && <p className="error">{error}</p>}
          <DeleteButton
            className="button--large"
            type="submit"
            title="Delete account"
            onClick={handleDeleteUser}
          />
        </Form>
      </div>
    </div>
  );
}

export default DeleteUserPopup;
