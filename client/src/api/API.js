import { ToastUtils } from '../utils';
import Auth from '../globals/Auth';

class API {

  static async request(
    endpoint, {
      method = 'GET',
      body = '',
      contentType = 'application/json',
      useAuth = false,
      showOkToast = true
    }
  ) {
    try {
      const url = `${process.env.REACT_APP_API_URL}${endpoint}`;

      const parsedAuth = {
        ...(useAuth && { 'Authorization': `Baerer ${Auth.token}` })
      }

      const parsedBody = {
        ...(body !== '' && { body })
      }

      const headers = {
        ...parsedAuth,
        'Content-Type': contentType,
      }

      const res = await fetch(url, {
        ...parsedBody,
        method: method,
        headers: headers
      });

      const resJSON = await res.json();
      if (res.ok) {
        if (showOkToast) ToastUtils.success(resJSON.message);
      } else {
        ToastUtils.error(resJSON.message);
      }

      return {
        ok: res.ok,
        json: resJSON
      }

    } catch (e) {
      ToastUtils.error('Error fetching data.');
      return {
        ok: false,
        json: {}
      }
    }
  }
}

export default API;
