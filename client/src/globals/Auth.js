import Cookies from 'js-cookie';

export default class Auth {

  static get token() {
    return Cookies.get('token');
  };

  static saveToken(token) {
    Cookies.set('token', token);
  }

  static deleteToken() {
    Cookies.remove('token');
  };
}
