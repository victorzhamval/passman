import { StringUtils, PopupUtils } from '../../../utils';
import EditVaultPopup from '../popups/EditVaultPopup';

export default function ItemVault({ data }) {
  const { username, description, siteUrl } = data;
  let favicon = StringUtils.getFavicon(siteUrl);

  return (
    <div className="vault vault--item" onClick={() => PopupUtils.openPopup('', () => EditVaultPopup({ data }))}>
      <img
        src={favicon}
        alt={`favicon of ${siteUrl} site`}
        width="32px"
        height="32px"
      />
      <div className="vault__wp">
        <p className="vault__title">{username}</p>
        <p className="vault__site">{siteUrl}</p>
      </div>
      <div className="spacer" />
      <p className="vault__description">{description !== "" ? description : "No description"}</p>
    </div>
  );
}

