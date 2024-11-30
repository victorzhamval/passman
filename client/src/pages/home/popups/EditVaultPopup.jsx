import { useState } from 'react';
import { PopupUtils, ObjectUtils } from '../../../utils';
import VaultsAPI from '../../../api/VaultsAPI';
import { loadVaults } from '../../../globals/refs';
import {
  DeleteButton,
  OutlineInput,
  OutlineMultiInput,
  SecondaryButton,
  Form
} from '../../../components';

export default function EditVaultPopup({ data }) {
  const [error, setError] = useState('');
  const [vault, setVault] = useState(data);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setVault(old => ({ ...old, [name]: value }));
  }

  async function handleUpdateVault() {
    const allFilled = ObjectUtils.isFilled(vault, 'description');
    if (!allFilled) {
      setError('Please, fill in the required fields.');
      return;
    }

    setError('');
    const res = await VaultsAPI.update(vault.id, vault);
    if (res.ok) {
      await loadVaults.current();
      PopupUtils.closePopup();
    }
  }

  async function handleDeleteVault() {
    const res = await VaultsAPI.delete(vault.id);
    if (res.ok) {
      await loadVaults.current();
      PopupUtils.closePopup();
    }
  }

  return (
    <div className="popup popup__window--vault">
      <div className="popup__bg" onClick={PopupUtils.closePopup} />
      <div className="popup__window popup__window--centered">
        <h2 className="popup__header">Edit Vault</h2>
        <Form className="popup__form">
          <OutlineInput
            value={vault.title}
            placeholder="Title"
            name="title"
            onChange={handleOnChange}
          />
          <OutlineInput
            value={vault.username}
            placeholder="Username"
            name="username"
            onChange={handleOnChange}
          />
          <OutlineInput
            value={vault.password}
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />
          <OutlineInput
            value={vault.siteUrl}
            placeholder="Site, example: youtube.com"
            name="siteUrl"
            onChange={handleOnChange}
          />
          <OutlineMultiInput
            value={vault.description}
            placeholder="Description (optional)"
            name="description"
            onChange={handleOnChange}
          />
          <div className="popup__buttons">
            <SecondaryButton
              title="Update vault"
              onClick={handleUpdateVault}
              type="submit"
              isLarge
            />
            <DeleteButton
              title="Delete vault"
              onClick={handleDeleteVault}
              isLarge
            />
          </div>
        </Form>
        {
          error !== "" && (
            <p className="error">
              All fields are required
            </p>
          )
        }
      </div>
    </div>
  );
}

