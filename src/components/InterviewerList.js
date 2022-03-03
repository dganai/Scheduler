import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  // value = selected interviewer, onChange = setInterviewer
  const { interviewers, value, onChange } = props;

  const interviewersArr = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArr}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
