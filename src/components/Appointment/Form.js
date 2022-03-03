import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  // destructure props
  const { interviewers, onSave, onCancel } = props;
  // state variables
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  // reset student and interviewer in state
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  // empty form, go back to to empty
  const cancel = () => {
    reset();
    onCancel();
  };

  // validation for student name
  const validate = () => {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }

    setError('');
    onSave(student, interviewer);
  };

  // form component for booking appointment
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
