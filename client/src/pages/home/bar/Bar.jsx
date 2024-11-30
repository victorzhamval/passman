import SearchInput from "./SearchInput";
import VaultModes from "./VaultModes";

export default function HomeBar({ mode, setMode, setKeyword }) {
  return (
    <div className='home__bar'>
      <SearchInput setKeyword={setKeyword} />
      <VaultModes mode={mode} setMode={setMode} />
    </div>
  );
}

