import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function setInterviewer(props) {
  // destrcuture props
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewersClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li onClick={setInterviewer} className={interviewersClass}>
      <img className={`interviewers__item-image`} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
