import React from 'react';
import ReactDOM from 'react-dom';

export default function withOverlay(Component) {
  return function(props) {
    return ReactDOM.createPortal(
      props.showOverlay && <div onClick={() => props.onHide()}>
        <div onClick={e => e.stopPropagation()}><Component {...props} /></div>
      </div>
    , document.getElementById('overlay-root'))
  }
}