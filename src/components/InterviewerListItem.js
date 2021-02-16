import React from "react";
import "components/InterviewerListItem.scss"
const classnames = require('classnames');

export default function InterviewerListItem(props){
  const interviewListItemClass = classnames("interviewers__item",{
  "interviewers__item--selected": props.selected,
  })

  const imageClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });

  return (
  <li className={interviewListItemClass} onClick={props.setInterviewer}>
<img
  className={imageClass}
  src={props.avatar}
  alt={props.name}
/>
{props.selected && props.name}
</li>
)};