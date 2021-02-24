import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

const formatSpots = (spot) => {
  if (spot === 0) {
    return 'no spots remaining'
  } else if (spot ===1) {
    return `${spot} spot remaining`
  } else {
    return `${spot} spots remaining`
  }
}

export default function DayListItem(props) {

  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayListItemClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
