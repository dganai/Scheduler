import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, day, setDay } = props;

  const newDaysArr = days.map((elems) => (
    <DayListItem
      key={elems.id}
      name={elems.name}
      spots={elems.spots}
      selected={elems.name === props.day}
      setDay={setDay}
    />
  ));
  return <ul>{newDaysArr}</ul>;
}
