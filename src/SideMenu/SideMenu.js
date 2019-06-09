import React from 'react';

import './SideMenu.css';

export default function (props) {
  return <div className="SideMenu">
    <ul>
      {React.Children.map(props.children, child => <li>{child}</li>)}
    </ul>
  </div>;
}
