import toast from 'react-hot-toast'
import { TOAST_DURATION, TOAST_POSITION } from '../globals/constants';

export default class ToastUtils {

  static success(content) {
    toast.success(content, {
      duration: TOAST_DURATION,
      position: TOAST_POSITION
    })
  }

  static error(content) {
    toast.error(content, {
      duration: TOAST_DURATION,
      position: TOAST_POSITION
    })
  }
}

