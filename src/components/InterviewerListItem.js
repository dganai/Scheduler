import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import classNames from 'classnames';

export default function setInterviewer(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  return (
    <li onClick={setInterviewer} className="interviewers__item">
      <img className={`interviewers__item-image`} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
