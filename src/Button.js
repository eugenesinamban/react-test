import React from 'react';
import './style.css';

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.display}
    </button>
  );
}

export default Button;