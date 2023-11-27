import React, { useState } from "react";
import "../styles/selectcard.css";

const Card = ({ student, onClick }: any) => {
  const userName = student.u;
  const roll = student.i;

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/_next/static/media/GenericMale.592f9e48.png")`,
  };

  const [isClicked, setIsClicked] = useState(false);

  const clicked = () => {
    if (!isClicked) {
      onClick(student.i);
      setIsClicked(true);
    } else {
      alert('This student has already been selected');
    }
  };

  return (
    <div className="select-card">
      <div className="select-image-box">
        <div className="select-profile" style={stylesss}></div>
      </div>
      <p className="select-card-details">{student.n}</p>

      <div className="select-carddetails">
        <button className="select-button" onClick={clicked}>
          Unselect
        </button>
      </div>
    </div>
  );
};

export default Card;
