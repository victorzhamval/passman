import { StringUtils, PopupUtils } from '../../../utils';
import EditVaultPopup from '../popups/EditVaultPopup';

export default function GridVault({ data }) {
  const { siteUrl, username } = data;
  let favicon = StringUtils.getFavicon(siteUrl);

  return (
    <div className="vault vault--grid" onClick={() => PopupUtils.openPopup('', () => EditVaultPopup({ data }))}>
      <img
        src={favicon}
        alt={`favicon of ${siteUrl} site`}
        width="32px"
        height="32px"
      />
      <p className="vault__title">{username}</p>
      <p className="vault__site">{siteUrl}</p>
    </div>
  )
}

