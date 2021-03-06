import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  // state variables
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // update the day in state
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // axios requests to set state object
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // update spots in dayList
  function updateSpots(state, appointments, id) {
    // index of current day in days array
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    // creating copy of days array
    let daysCopy = [...state.days];
    // copy of day wanting to be updated
    const dayCopy = { ...state.days[dayIndex] };
    // update spots at index in day copy if appointment is valid
    if (appointments[id].interview) {
      dayCopy.spots--;
    } else {
      dayCopy.spots++;
    }
    // update copy of days
    daysCopy[dayIndex] = dayCopy;
    return daysCopy;
  }

  function bookInterview(id, interview) {
    // check if booking is new or edited
    const newAppt = state.appointments[id].interview ? true : false;

    // insert new interview into database and update state with new appt obj
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        return setState((prev) => {
          // create new appointments object with new interview added
          const appointment = {
            ...prev.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment,
          };
          return {
            ...prev,
            appointments,

            // update days in state if new appt is being made
            days: newAppt ? prev.days : updateSpots(prev, appointments, id),
          };
        });
      });
  }

  function cancelInterview(id) {
    // insert new interview into db and update state with new appt obj
    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => {
        // create new appt obj with interview cancelled
        const appointment = {
          ...prev.appointments[id],
          interview: null,
        };
        const appointments = {
          ...prev.appointments,
          [id]: appointment,
        };
        return {
          ...prev,
          appointments,
          days: updateSpots(prev, appointments, id),
        };
      })
    );
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
