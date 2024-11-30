import React, { useState } from 'react';
import VaultsAPI from '../../../api/VaultsAPI';
import { OutlineInput, OutlineMultiInput, SecondaryButton } from '../../../components'
import { PopupUtils, ObjectUtils } from '../../../utils';
import { loadVaults } from '../../../globals/refs';

export default function AddVaultPopup() {

  const [vault, setVault] = useState({
    title: '',
    username: '',
    password: '',
    siteUrl: '',
    description: '',
  });

  const [error, setError] = useState(false)

  function handleOnChange(e) {
    const { name, value } = e.target;
    setVault(old => ({ ...old, [name]: value }))
  }

  async function handleAddVault() {
    const allFilled = ObjectUtils.isFilled(vault, 'description');
    if (!allFilled) {
      setError('Please, fill in the required fields.');
      return;
    }

    setError('');
    const res = await VaultsAPI.add(vault);
    if (res.ok) {
      await loadVaults.current();
      PopupUtils.closePopup();
    }
  }

  return (
    <div className="popup">
      <div className="popup__bg" onClick={PopupUtils.closePopup} />
      <div className="popup__window">
        <h2 className="popup__header">New vault</h2>
        <div className="popup__form">
          <OutlineInput placeholder="Title" name="title" onChange={handleOnChange} />
          <OutlineInput placeholder="Username" name="username" onChange={handleOnChange} />
          <OutlineInput placeholder="Password" name="password" onChange={handleOnChange} />
          <OutlineInput placeholder="Site, example: youtube.com" name="siteUrl" onChange={handleOnChange} />
          <OutlineMultiInput placeholder="Description (optional)" name="description" onChange={handleOnChange} />
          {error !== "" && <p className="error">{error}</p>}
          <SecondaryButton title="Add" onClick={handleAddVault} type="submit" isLarge />
        </div>
      </div>
    </div>
  );
}

