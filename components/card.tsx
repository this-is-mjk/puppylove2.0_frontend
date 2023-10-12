import Image from "next/image";
import React from "react";
import "./card.css";

const Card = ({ student } : any) => {
  var userName = student.u;
  var roll = student.i;

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/_next/static/media/GenericMale.592f9e48.png")`,
  };
  return (
    <div className="card">
      {/* <div >
                <Image src="/Dog.jpg" width={100} height={100} alt="Dog" className="card-image" />
            </div> */}
      <div className="image-box">
        <div className="profile" style={stylesss}></div>
      </div>
      <div className="carddetails">
        <p className="card-details">{student.n}</p>
        <p className="card-details">Button</p>
        {/* <p className='card-details'>Newar</p> */}
        {/* <p className='card-details'>Newar</p> */}
      </div>
    </div>
  );
};

export default Card;
