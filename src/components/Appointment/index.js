import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteAppointment() {
    transition(DELETING);
    props.deleteInterview(props.id).then(() => transition(EMPTY))
  }
  
  function confirm() {
    transition(CONFIRM)
  }

  function edit() {
    transition(EDIT);
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={confirm}
    onEdit={edit}
  />
)}
{mode === CREATE && (
  <Form
  interviewers={props.interviewers}
  onCancel={back}
  onSave={save}
  bookInterview={props.bookInterview}
  deleteInterview={props.deleteInterview}
  />
)}
  {mode === SAVING && (<Status message={'Saving'}/>)}
  {mode === DELETING && (<Status message={'Deleting'}/>)}
  {mode === CONFIRM && (
  <Confirm message={'Are you sure?'} onCancel={back} onConfirm={deleteAppointment}
  />
  )}
  {mode === EDIT && (
      <Form
      interviewers={props.interviewers}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      onCancel={back}
      onSave={save}
      bookInterview={props.bookInterview}
      deleteInterview={props.deleteInterview}
      />
    
  )}
  </article>
  )
}
