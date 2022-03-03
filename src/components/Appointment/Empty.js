import React from 'react';

export default function Empty(props) {
  // destructure props
  const { onAdd } = props;

  // Empty component returned, when no appointment is booked
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}
