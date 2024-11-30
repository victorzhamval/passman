import { useState } from "react";
import HomeBar from "./bar/Bar";
import Vaults from "./vaults/Vaults";
import Storage from "../../globals/Storage";
import "./_home.scss";

export default function Home() {
  const [mode, setMode] = useState(Storage.vaultsMode);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="home page">
      <HomeBar
        setKeyword={setKeyword}
        mode={mode}
        setMode={setMode}
      />
      <div className="page__content">
        <Vaults keyword={keyword} mode={mode} />
      </div>
    </div>
  )
}

