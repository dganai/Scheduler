import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';

export default function setInterviewer(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewersClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li onClick={setInterviewer} className={interviewersClass}>
      <img
        className={`interviewers__item-image`}
        src={props.avatar}
        alt={props.name}
      />
      {selected && name}
    </li>
  );
}
