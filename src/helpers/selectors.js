export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((element) => element.name === day);

  return findDay
    ? findDay.appointments.map((id) => state.appointments[id])
    : [];
}

export function getInterview(state, interview) {
  if (!interview) return null;

  let interviewerID = interview.interviewer;

  let appointmentInterviewer = state.interviewers[interviewerID];
  return { ...interview, interviewer: appointmentInterviewer };
}
