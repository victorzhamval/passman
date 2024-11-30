import { LogoIcon } from '../../globals/icons';

export default function LabelLogo({showVersion = false}) {
  return (
    <a className="logo" href="/">
      <LogoIcon/>
      <div className="logo__label">
        <h2 className="logo__label-name">Passman</h2>
        {showVersion && <small className="logo__label-version">{process.env.REACT_APP_VERSION}</small>}
      </div> 
    </a> 
  );
}

