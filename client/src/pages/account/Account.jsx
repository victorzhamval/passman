import { useEffect, useState } from 'react';
import ChangePasswordPopup from './ChangePasswordPopup';
import DeleteAccountPopup from './DeleteAccountPopup';
import UsersAPI from '../../api/UsersAPI';
import ChangePfpPopup from './ChangePfpPopup';
import { DeleteButton, SecondaryButton } from '../../components';
import { PopupUtils } from '../../utils';
import { loadProfile } from '../../globals/refs';
import './_account.scss';

export default function Account() {

  const [profile, setProfile] = useState({
    username: '',
    profileImage: '',
    description: '',
    createdAt: ''
  });

  function getProfileImage() {
    return `${process.env.REACT_APP_API_URL}uploads/${profile.profileImage}`;
  }

  loadProfile.current = async function() {
    const res = await UsersAPI.getProfile();
    if (res.ok) {
      const profile = await res.json.profile;
      setProfile(profile);
    }
  }

  useEffect(() => {
    loadProfile.current();
  }, []);

  return (
    <div className="account page">
      <div className="account__avatar-wp" onClick={() => { PopupUtils.openPopup("page", ChangePfpPopup) }}>
        {profile.profileImage !== "" && <img className="account__avatar" src={getProfileImage()} alt="Your profile image" />}
      </div>
      <h3 className="account__username">{profile.username}</h3>
      <p className="account__description">{profile.description}</p>
      <div className="account__actions">
        <SecondaryButton
          title="Change password"
          onClick={() => PopupUtils.openPopup("page", ChangePasswordPopup)}
          isLarge
        />
        <DeleteButton
          title="Delete account"
          onClick={() => PopupUtils.openPopup("page", DeleteAccountPopup)}
          isLarge
        />
      </div>
    </div>
  );
}

