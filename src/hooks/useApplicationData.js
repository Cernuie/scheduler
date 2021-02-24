import { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  function bookInterview(id, interview) {
  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(url, appointments[id])
    .then(response => {
      setState({ ...state, appointments });
    });
  };

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  function deleteInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const url = `http://localhost:8001/api/appointments/${id}`
      return axios.delete(url, appointments[id])
      .then(response => {
        setState({ ...state, appointments });
      })
  }
  
  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`
    const appointmentsUrl = `http://localhost:8001/api/appointments`
    const interviewersUrl = `http://localhost:8001/api/interviewers`
    let appointmentsList = getAppointmentsForDay(state, state.day);
    let spots = appointmentsList.filter(appointment => !appointment.interview).length;
    let days = state.days.map(day => {
      if (day.name === state.day) {
        day.spots = spots;
      }
      return day;
    })
    setState(prev => ({...prev,
      days: days
    }))

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
  }, [state.appointments])
  
  return {state, setDay, bookInterview, deleteInterview}
}