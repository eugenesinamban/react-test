import React from 'react';
import './style.css';

function Screen(props) {
  return (
    <div className="screen">
      <p className="onScreenText">{props.value}</p>
    </div>
  );
}

export default Screen;