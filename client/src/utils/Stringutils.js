import { HTTPS, FAVICON_URL} from '../globals/constants';

class StringUtils {

  static toUrl(url) {
    return !url.startsWith(HTTPS) ? `${HTTPS}${url}` : url;
  }

  static getFavicon(url) {
    return FAVICON_URL.replace("%URL%", url);
  }
}

export default StringUtils;
