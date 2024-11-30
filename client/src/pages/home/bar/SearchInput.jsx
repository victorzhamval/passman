import { Button, Input } from "../../../components";
import { MoreIcon } from "../../../globals/Icons";
import { PopupUtils } from "../../../utils";
import AddVaultPopup from "../popups/AddVaultPopup";

export default function SearchInput({ setKeyword }) {

  function handleOnChange(e) {
    const txt = e.target.value;
    setKeyword(txt);
  }

  return (
    <div className="home__bar-l">
      <Button
        title='Add vault'
        Icon={MoreIcon}
        onClick={() => PopupUtils.openPopup("page", AddVaultPopup)}
      />
      <Input placeholder="Search" onChange={handleOnChange} />
    </div>
  );
};
