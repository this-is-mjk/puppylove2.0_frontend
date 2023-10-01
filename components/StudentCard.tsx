import React from "react";
import { BsSearch } from "react-icons/bs";
import "./StudentCard.css";

interface Student {
  _id: string;
  b: string;
  d: string;
  g: string;
  h: string;
  n: string;
  p: string;
  r: string;
}

interface StudentCardProps {
  student: Student;
}

const defaultImageSrc =
  "https://i.scdn.co/image/ab67616d0000b273d45ec66aa3cf3864205fd068";

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="student-card">
      <div className="image-container">
        <div className="image-box">
          <img
            src={defaultImageSrc}
            alt="Profile"
            className="student-image"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="student-details">
        <div className="student-info">
          <p className="student-name">{student.n}</p>
          <p className="student-roll">{student.r}</p>
          <p className="student-dept">
            {student.p}, {student.d}
          </p>
          <div className="more-info">
            <p>
              {student.r.length > 0 ? student.r + ", " : ""} {student.h}
            </p>
            {/* Add other student information here */}
          </div>
          {/* Add other components or content here */}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
