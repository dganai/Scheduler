import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (remainingSpots) => {
    switch (remainingSpots) {
      case 0:
        return `no spots remaining`;
      case 1:
        return `${remainingSpots} spot remaining`;
      default:
        return `${remainingSpots} spots remaining`;
    }
  };
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
