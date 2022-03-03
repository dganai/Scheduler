import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {
  // destructure props
  const { name, spots, selected, setDay } = props;
  // change styling for class name dependent on selected value
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  // change spot availablity based on how many spots are left
  const formatSpots =
    spots === 0
      ? 'no spots remaining'
      : spots === 1
      ? '1 spot remaining'
      : `${spots} spots remaining`;

  return (
    <li
      onClick={() => setDay(name)}
      className={dayClass}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
}
