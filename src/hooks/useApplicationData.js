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
  const setDay = (day) => setState({ ...state, day });

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
  function updateSpots(appointments, id) {
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
    // create new appointments object with new interview added
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // insert new interview into database and update state with new appts object
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(true),
      });
    });
  }

  function cancelInterview(id) {
    // create new appts object with cancelled interview for selected appt
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: updateSpots() }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
