import Vault from "./Vault";

export default function VaultsList({ keyword, vaults, mode }) {
  const lowKeyword = keyword.toLowerCase();
  const filteredVaults = vaults.filter(vault => {
    const username = vault.username.toLowerCase();
    const siteUrl = vault.siteUrl.toLowerCase();
    return username.includes(lowKeyword) || siteUrl.includes(lowKeyword);
  });

  return (
    <div className={`vaults vaults--${mode}`}>
      {filteredVaults.map((vaultData) => (
        <Vault
          key={vaultData.id}
          mode={mode}
          data={vaultData}
        />
      ))}
    </div>
  )
};

