import { useEffect, useState } from 'react';
import { CopyIcon } from '../../globals/icons';
import Storage from '../../globals/Storage';
import { ToastUtils, ObjectUtils } from '../../utils';
import RandomUtils from '../../utils/RandomUtils';
import { IconButton, CheckBox, Slider, SecondaryButton } from '../../components';
import PasswordGeneratorSection from './PasswordGeneratorSection';
import './_password-generator.scss';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [params, setParams] = useState(Storage.passwordGeneratorParams);

  function handleGeneratePassword() {
    let generatedPassword = '';
    let digit = '';
    let param = '';
    let lengthExcluded = ObjectUtils.omit(params, 'length');
    let activeParams = ObjectUtils.activeKeys(lengthExcluded);

    for (let i = 0; i < params.length; i++) {
      param = RandomUtils.fromArray(activeParams);
      if (param === 'useLowerCase') digit = RandomUtils.letter(false);
      else if (param === 'useUpperCase') digit = RandomUtils.letter(true);
      else if (param === 'useNumbers') digit = RandomUtils.number();
      else if (param === 'useSymbols') digit = RandomUtils.symbol();
      generatedPassword += digit;
    }

    setPassword(generatedPassword);
  }

  function handleChangePasswordLength(value) {
    const newParams = { ...params, length: value };
    Storage.savePasswordGeneratorParams(newParams)
    setParams(newParams)
  }

  function handleOnChangeParams(e) {
    const name = e.target.name;
    const value = e.currentTarget.checked;
    let lengthExcluded = ObjectUtils.omit(params, 'length');
    let activeParams = ObjectUtils.activeKeys(lengthExcluded);
    if (activeParams.length !== 1 || value) {
      const newParams = { ...params, [name]: value };
      Storage.savePasswordGeneratorParams(newParams);
      setParams(newParams);
    }
  }

  function copyPassword() {
    try {
      navigator.clipboard.writeText(password);
      ToastUtils.success('Password copied to clipboard.');
    } catch (e) {
      ToastUtils.error('Error trying to copy password.');
    }
  }

  useEffect(() => {
    handleGeneratePassword();
  }, [])

  return (
    <div className="password-generator page">
      <PasswordGeneratorSection title="Generated password:">
        <div className="password-generator__password-wp">
          <div className="password-generator__password-wpx2">
            <p className="password-generator__password">{password}</p>
          </div>
          <IconButton Icon={CopyIcon} onClick={copyPassword} />
        </div>
      </PasswordGeneratorSection>
      <PasswordGeneratorSection title="Length:">
        <Slider
          min={5}
          max={100}
          name="length"
          defaultValue={params.length}
          onChange={handleChangePasswordLength} />
      </PasswordGeneratorSection>
      <PasswordGeneratorSection title="Options:">
        <div className="password-generator__params">
          <CheckBox
            title="ABC"
            name="useUpperCase"
            checked={params.useUpperCase}
            onChange={handleOnChangeParams}
          />
          <CheckBox
            title="abc"
            name="useLowerCase"
            checked={params.useLowerCase}
            onChange={handleOnChangeParams}
          />
          <CheckBox
            title="123"
            name="useNumbers"
            checked={params.useNumbers}
            onChange={handleOnChangeParams}
          />
          <CheckBox
            title="$*#"
            name="useSymbols"
            checked={params.useSymbols}
            onChange={handleOnChangeParams}
          />
        </div>
      </PasswordGeneratorSection>
      <SecondaryButton title="Generate" onClick={handleGeneratePassword} />
    </div>
  );
}

