import React from "react";
import Card from "./selectcard";
import "../styles/selectcard.css";
import {Student} from "../pages/dashboard"

interface ClickedStudentsProps {
  clickedStudents: Student[];
  onUnselectStudent: (studentRoll: string) => void;
  hearts_submitted: boolean
}

const ClickedStudents: React.FC<ClickedStudentsProps> = ({ clickedStudents, onUnselectStudent, hearts_submitted }) => {
  return (
    <div className="clicked-students-container">
      {clickedStudents.map((student) => (
        <Card
          key={student.i}
          student={student}
          onClick={() => onUnselectStudent(student.i)}
          unselectButton={true}
          hearts_submitted={hearts_submitted}
        />
      ))}
    </div>
  );
};

export default ClickedStudents;