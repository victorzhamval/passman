import GridVault from './GridVault';
import Grid2Vault from './Grid2Vault';
import ItemVault from './ItemVault';

export default function Vault({ mode, data }) {
  if (mode === 'item') return <ItemVault data={data} />;
  if (mode === 'grid') return <GridVault data={data} />;
  return <Grid2Vault data={data} />;
}

