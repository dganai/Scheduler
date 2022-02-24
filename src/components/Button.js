import React from 'react';

import 'components/Button.scss';

export default function Button(props) {
  let buttonClass = 'button';
  const { confirm, danger, disabled } = props;

  if (confirm) buttonClass += ' button--confirm';
  if (danger) buttonClass += ' button--danger';
  if (disabled) buttonClass += ' button--disabled';

  return (
    <button onClick={props.onClick} className={buttonClass} disabled={disabled}>
      {props.children}
    </button>
  );
}
