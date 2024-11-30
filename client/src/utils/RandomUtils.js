import { ALPHABET, NUMBERS, SYMBOLS } from "../globals/constants";

export default class RandomUtils {

  static random({ min = 0, max }) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static fromArray(arr) {
    return arr[this.random({ max: arr.length - 1})];
  }

  static keyFromObject(obj) {
    let keys = Object.keys(obj);
    return this.randomFromArray(keys);
  }

  static valueFromObject(obj) {
    let values = Object.values(obj);
    return this.randomFromArray(values);
  }

  static letter(toUpperCase) {
    let letter = ALPHABET[this.random({ max: ALPHABET.length - 1 })];
    if (toUpperCase) return letter.toUpperCase();
    return letter;
  }

  static number() {
    return NUMBERS[this.random({ max: NUMBERS.length - 1 })];
  }

  static symbol() {
    return SYMBOLS[this.random({ max: SYMBOLS.length - 1 })];
  }
}
