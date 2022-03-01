import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import { useVisualMode } from 'components/hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  const { id, interview, time } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => console.log('Clicked onAdd')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}
