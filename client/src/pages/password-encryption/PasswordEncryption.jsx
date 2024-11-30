import { useState } from 'react';
import { AES, enc } from 'crypto-js';
import { ToastUtils } from '../../utils';
import Output from './Output';
import { SecondaryButton, OutlineInput, OutlineMultiInput, Form } from '../../components';
import './_password-encryption.scss';
export default function PasswordEncryption() {
  const [encryptor, setEncryptor] = useState({
    password: '',
    key: '',
    output: '',
    error: ''
  });

  const [decryptor, setDecryptor] = useState({
    decPassword: '',
    decKey: '',
    output: '',
    error: ''
  });

  function handleOnChangeEncryptor(e) {
    const { name, value } = e.target;
    setEncryptor(old => ({ ...old, [name]: value }))
  }

  function handleOnChangeDecryptor(e) {
    const { name, value } = e.target;
    setDecryptor(old => ({ ...old, [name]: value }))
  }

  function handleEncrypt() {
    try {
      if (encryptor.password.trim() !== '') {
        let encrypted = AES.encrypt(encryptor.password, encryptor.key).toString();
        setEncryptor(old => ({ ...old, output: encrypted, error: '' }));
      } else {
        setEncryptor(old => ({ ...old, error: 'Password is required.' }))
      }
    } catch (e) {
      ToastUtils.error('Error, can\'t encrypt.');
    }
  }

  function handleDecrypt() {
    try {
      if (decryptor.decPassword.trim() !== '') {
        let bytes = AES.decrypt(decryptor.decPassword, decryptor.decKey);
        let decrypted = bytes.toString(enc.Utf8)
        setDecryptor(old => ({ ...old, output: decrypted, error: '' }));
      } else {
        setDecryptor(old => ({ ...old, error: 'Encrypted password is required.' }));
      }
    } catch (e) {
      ToastUtils.error('Error, can\'t decrypt.')
    }
  }

  return (
    <div className="page password-encryption">
      <small className="password-encryption__about">
        The Advanced Encryption Standard (AES) is a cipher chosen by the U.S. government to protect classified information.
      </small>
      <div className="password-encryption__forms">
        <Form className="password-encryption__form">
          <h3>Encryptor:</h3>
          <OutlineMultiInput
            name="password"
            placeholder="Password"
            onChange={handleOnChangeEncryptor}
          />
          <OutlineInput
            name="key"
            placeholder="Key (optional)"
            onChange={handleOnChangeEncryptor}
          />
          <SecondaryButton
            title="Encrypt"
            isLarge={true}
            onClick={handleEncrypt}
            type="submit"
          />
          <h3>Output:</h3>
          <Output result={encryptor.output} />
          <p className="error">{encryptor.error}</p>
        </Form>
        <div className="password-encryption__spacer" />
        <Form className="password-encryption__form">
          <h3>Decryptor:</h3>
          <OutlineMultiInput
            name="decPassword"
            placeholder="Encrypted password"
            onChange={handleOnChangeDecryptor}
          />
          <OutlineInput
            name="decKey"
            placeholder="Key (optional)"
            onChange={handleOnChangeDecryptor}
          />
          <SecondaryButton
            title="Decrypt"
            isLarge="true"
            onClick={handleDecrypt}
            type="submit"
          />
          <h3>Output:</h3>
          <Output result={decryptor.output} />
          <p className="error">{decryptor.error}</p>
        </Form>
      </div>
    </div>
  );
}

