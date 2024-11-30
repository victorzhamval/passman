import { StringUtils } from '../utils';
import API from '../api/API';

class VaultsAPI {

  static async get() {
    return await API.request('vaults', {
      useAuth: true,
      showOkToast: false
    });
  }

  static async add(vault) {
    vault.siteUrl = StringUtils.toUrl(vault.siteUrl);
    const JSONbody = JSON.stringify(vault);
    return await API.request('vaults/add', {
      method: 'POST',
      body: JSONbody,
      useAuth: true
    });
  }

  static async update(id, vault) {
    vault.siteUrl = StringUtils.toUrl(vault.siteUrl);
    const JSONbody = JSON.stringify(vault);
    return await API.request(`vaults/update/${id}`, {
      method: 'PATCH',
      body: JSONbody,
      useAuth: true
    });
  }

  static async delete(vaultID) {
    return await API.request(`vaults/delete/${vaultID}`, {
      method: 'DELETE',
      useAuth: true
    })
  }
}

export default VaultsAPI;
