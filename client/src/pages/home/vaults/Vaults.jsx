import { useEffect, useState } from 'react';
import { loadVaults } from '../../../globals/refs';
import VaultsAPI from '../../../api/VaultsAPI';
import VaultsList from './VaultsList';

export default function Vaults({ keyword, mode }) {
  const [vaults, setVaults] = useState([]);

  loadVaults.current = async () => {
    const res = await VaultsAPI.get();
    if (res.ok) {
      const userVaults = res.json.vaults;
      setVaults(userVaults);
    }
  }

  useEffect(() => {
    loadVaults.current();
  }, [])

  if (vaults.length > 0) {
    return (
      <VaultsList
        keyword={keyword}
        mode={mode}
        vaults={vaults}
      />
    );
  }

  return (
    <h2 className='home__not-found'>
      No vaults found.
    </h2>
  );
}

