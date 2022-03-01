export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((element) => element.name === day);

  return findDay
    ? findDay.appointments.map((id) => state.appointments[id])
    : [];
}
