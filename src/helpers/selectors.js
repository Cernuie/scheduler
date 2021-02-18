
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointmentDays = state.days.filter(days => days.name === day)
  if (appointmentDays.length > 0) {
    const appointmentArray = []
    const getAppointments = appointmentDays[0].appointments
    getAppointments.forEach(id => appointmentArray.push(state.appointments[id]))
    return appointmentArray
  } else {
    return [];
  }

}
