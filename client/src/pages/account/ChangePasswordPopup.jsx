import { useState } from 'react';
import { OutlineInput, SecondaryButton, Form } from '../../components';
import UsersAPI from '../../api/UsersAPI';
import { PopupUtils } from '../../utils';

export default function ChangePasswordPopup() {

  const [form, setForm] = useState({
    currPassword: '',
    newPassword: '',
    newPasswordMatch: ''
  });

  const [error, setError] = useState('');

  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm(old => ({ ...old, [name]: value }))
  }

  async function handleChangePassword() {
    if (form.currPassword === '' || form.newPassword === '' || form.newPasswordMatch === '') {
      setError('All fields are required.');
      return;
    }

    if (form.newPassword !== form.newPasswordMatch) {
      setError('Passwords don\'t match.');
      return;
    }

    setError('');
    const res = await UsersAPI.changePassword(form.currPassword, form.newPassword);
    if (res.ok) {
      PopupUtils.closePopup();
    }
  }

  return (
    <div className="popup">
      <div className="popup__bg" onClick={PopupUtils.closePopup} />
      <div className="popup__window popup__window--centered">
        <Form>
          <h2 className="popup__header">Change your password</h2>
          <OutlineInput
            name="currPassword"
            type="password"
            placeholder="Your current password"
            onChange={handleOnChange}
          />
          <OutlineInput
            name="newPassword"
            type="password"
            placeholder="New password"
            onChange={handleOnChange}
          />
          <OutlineInput
            name="newPasswordMatch"
            type="password"
            placeholder="Repeat new password"
            onChange={handleOnChange}
          />
          {error !== "" && <p className="error">{error}</p>}
          <SecondaryButton
            className="button--large"
            type="submit"
            title="Change password"
            onClick={handleChangePassword}
            isLarge
          />
        </Form>
      </div>
    </div>
  );
}

