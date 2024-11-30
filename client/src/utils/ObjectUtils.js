export default class ObjectUtils {

  static omit(obj, key) {
    const { [key]: omitted, ...others } = obj;
    return others;
  }

  static isFilled(obj, exclude) {
    if (exclude) obj = this.omit(obj, exclude);
    console.log(obj)
    return Object.values(obj).every(str => typeof(str) === 'string' ? str.trim() !== '' : true);
  }

  static activeKeys(obj) {
    return Object.keys(obj).filter(key => obj[key])
  }
}

