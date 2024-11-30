import { IconButton } from '../../../components';
import { GridIcon, ItemIcon, TwoGridIcon } from '../../../globals/Icons';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Storage from '../../../globals/Storage';

export default function VaultModes({ mode, setMode }) {
  const isPhone = useMediaQuery('(min-width: 610px)');

  function handleSetMode(mode) {
    Storage.saveVaultsMode(mode);
    setMode(mode);
  }

  return isPhone ?
    (
      <div className="home__bar-r">
        <IconButton
          Icon={ItemIcon}
          isDisabled={mode !== "item"}
          onClick={() => { handleSetMode("item")}}
        />
        <IconButton
          Icon={TwoGridIcon}
          isDisabled={mode !== "grid2"}
          onClick={() => { handleSetMode("grid2") }}
        />
        <IconButton
          Icon={GridIcon}
          isDisabled={mode !== "grid"}
          onClick={() => { handleSetMode("grid") }}
        />
      </div>
    ) : (
      <div />
    );
}
