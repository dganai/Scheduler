import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Error from './Error';

// useVisualMode constant for rendering different appointment views
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  // destructure props
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  // mode variables in state
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // to save an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    // transition to SAVING view
    transition(SAVING);
    bookInterview(id, interview)
      // show booked interview if successful, show error if unsuccessful
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // when deleting appointment
  function cancel() {
    // show DELETE status
    transition(DELETE, true);
    cancelInterview(id)
      // when complete, show add button
      .then(() => transition(EMPTY))
      // if cannot delete, render error
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {/*empty appointment */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/*booked appointment */}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {/*making a new appointment */}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {/*editing an existing appointment */}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {/*confirm interview and show saving cirlce */}
      {mode === SAVING && <Status message="Saving" />}
      {/*deleting circle when confirmed delete */}
      {mode === DELETE && <Status message="Deleting" />}
      {/*confirm deleting views */}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => cancel()}
          onCancel={() => back()}
        />
      )}
      {/*error messages */}
      {mode === ERROR_SAVE && (
        <Error message="Unable to save appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete appointment." onClose={() => back()} />
      )}
    </article>
  );
}
