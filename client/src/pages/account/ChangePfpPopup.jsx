import { useState } from 'react';
import { DeleteButton, SecondaryButton, Form, ImagePicker } from '../../components';
import UsersAPI from '../../api/UsersAPI';
import { PopupUtils } from '../../utils';
import { loadProfile } from '../../globals/refs';

const ChangePfpPopup = () => {

  const [profileImage, setProfileImage] = useState({
    bytes: [],
    type: ''
  });

  const [error, setError] = useState('');

  async function handleOnChangePicker(e) {
    const { files } = e.target;
    const image = files[0];
    const imageBuffer = await image.arrayBuffer();
    const bytes = new Uint8Array(imageBuffer).toString().split(',');
    setProfileImage({ bytes: bytes, type: image.type });
  }

  async function handleChangePfp() {
    const isImageValid = profileImage.bytes.length > 0;
    if (isImageValid) {
      setError('')
      const res = await UsersAPI.changePfp(profileImage);
      if (res.ok) {
        await loadProfile.current();
        PopupUtils.closePopup();
      }
    } else {
      setError('You must choose a new profile image.');
    }
  }

  async function handleDeletePfp() {
    const res = await UsersAPI.deletePfp();
    if (res.ok) {
      await loadProfile.current();
      PopupUtils.closePopup();
    }
  }
  return (
    <div className="popup">
      <div className="popup__bg" onClick={PopupUtils.closePopup}></div>
      <div className="popup__window popup__window--centered">
        <h2 className="popup__header">Change profile picture</h2>
        <Form>
          <ImagePicker
            accept="image/*"
            onChange={handleOnChangePicker}
            label={"Choose new image"}
          />
          {error !== "" && <p className="error">{error}</p>}
          <SecondaryButton type="submit"
            title="Change profile picture"
            onClick={handleChangePfp}
            isLarge
          />
          <DeleteButton
            title="Delete current profile picture"
            onClick={handleDeletePfp}
            isLarge
          />
        </Form>
      </div>
    </div>
  );
}

export default ChangePfpPopup;
