import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  const formatSpots =
    spots === 0
      ? 'no spots remaining'
      : spots === 1
      ? '1 spot remaining'
      : `${spots} spots remaining`;

  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
}
