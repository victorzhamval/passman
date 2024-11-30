import { StringUtils, PopupUtils } from '../../../utils';
import EditVaultPopup from '../popups/EditVaultPopup';

export default function Grid2Vault({ data }) {
  const { username, description, siteUrl } = data;
  let favicon = StringUtils.getFavicon(siteUrl);

  return (
    <div className="vault vault--grid2" onClick={() => PopupUtils.openPopup('', () => EditVaultPopup({ data }))}>
      <img
        src={favicon}
        alt={`favicon of ${siteUrl} site`}
        width="32px"
        height="32px"
      />
      <p className="vault__title">{username}</p>
      <p className="vault__site">{siteUrl}</p>
      <p className="vault__description">{description !== "" ? description : "No description"}</p>
    </div>
  )
}

