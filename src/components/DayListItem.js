import React from 'react';
import classNames from 'classnames';
import DayListItem from 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  return (
    <li onClick={() => setDay(name)} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}
