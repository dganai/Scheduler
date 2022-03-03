import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

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

  function updateSpots(appointments, id) {
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    let daysCopy = [...state.days];

    const dayCopy = { ...state.days[dayIndex] };
    if (appointments[id].interview) {
      dayCopy.spots--;
    } else {
      dayCopy.spots++;
    }
    daysCopy[dayIndex] = dayCopy;
    return daysCopy;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(true),
      });
    });
  }

  function cancelInterview(id) {
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
