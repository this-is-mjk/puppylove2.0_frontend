import React, { useState } from "react";
import "../styles/card.css";

const Card = ({ student, onClick, clickedCheck }: any) => {
  const userName = student.u;
  const roll = student.i;

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/_next/static/media/GenericMale.592f9e48.png")`,
  };

  const isClicked = false;

  const clicked = () => {
    if (!isClicked) {
      onClick(student.i);
    } else {
      alert('This student has already been clicked!');
    }
  };

  return (
    <div className="card">
      <div className="image-box">
        <div className="profile" style={stylesss}></div>
      </div>
      <p className="card-details">{student.n}</p>

      <div className="carddetails">
        <button className="button" onClick={clicked} disabled={clickedCheck}>
          {clickedCheck ? "Selected" : "Send Heart"}
        </button>
      </div>
    </div>
  );
};

export default Card;
