import React from "react";
import "./Card.css";

const Card = props => {
  return (
    <div onClick={() => props.setClicked(props.id)} className="card col-md-2">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="itemName">{props.name}</div>
    </div>
  );
};

export default Card;
