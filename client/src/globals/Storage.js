import { DEFAULT_PASSWORD_GEN_PARAMS, DEFAULT_VAULTS_MODE } from './constants';

export default class Storage {

  static get vaultsMode() {
    const mode = localStorage.getItem('vaultsMode');
    return mode ? mode : DEFAULT_VAULTS_MODE;
  }

  static get passwordGeneratorParams() {
    const passwordGeneratorParams = localStorage.getItem('passwordGeneratorParams');
    return passwordGeneratorParams ? JSON.parse(passwordGeneratorParams) : DEFAULT_PASSWORD_GEN_PARAMS;
  }

  static saveVaultsMode(mode) {
    localStorage.setItem('vaultsMode', mode);
  }

  static savePasswordGeneratorParams(params) {
    localStorage.setItem('passwordGeneratorParams', JSON.stringify(params))
  }
}

