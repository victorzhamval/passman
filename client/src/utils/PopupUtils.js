import ReactDOM from 'react-dom/client';

class PopupUtils {

  static openPopup(parentClass, Popup) {
    const parent = parentClass === '' ? document.getElementById('root') : document.getElementsByClassName(parentClass)[0];
    const wrapper = document.createElement('div');
    const popup = ReactDOM.createRoot(wrapper);
    wrapper.id = 'popup';
    parent.prepend(wrapper);
    popup.render(<Popup />);
  }

  static closePopup() {
    const popup = document.getElementById('popup')
    const popupWindow = document.getElementsByClassName('popup__window')[0];
    popupWindow.classList.add('hide-slide-from-top-anim');
    setTimeout(() => {
      popup.remove();
    }, 250);
  }
}

export default PopupUtils;
