import React, { useState, useEffect} from "react";
import axios from "axios";
import DayList from "components/DayList"
import "components/Application.scss";
import Appointment from "components/Appointment/index"
import {getAppointmentsForDay} from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Add the line below:
  const dailyAppointments = getAppointmentsForDay(state, state.day);
    
  const setDay = day => setState(prev => ({ ...prev, day }));


  const appointmentList = dailyAppointments.map(appointment => {
    return (<Appointment key={appointment.id} {...appointment} />)
  })

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`
    const appointmentsUrl = `http://localhost:8001/api/appointments`
    const interviewersUrl = `http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
/>

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>

      </section>
      <section className="schedule">
        {appointmentList}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
