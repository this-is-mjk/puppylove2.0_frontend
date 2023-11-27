import React from "react";
import Card from "./selectcard";
import "../styles/selectcard.css";

interface ClickedStudentsProps {
  clickedStudents: Student[];
  onUnselectStudent: (studentRoll: string) => void;
}

const ClickedStudents: React.FC<ClickedStudentsProps> = ({ clickedStudents, onUnselectStudent }) => {
  return (
    <div className="clicked-students-container">
      {clickedStudents.map((student) => (
        <Card
          key={student.i}
          student={student}
          onClick={() => onUnselectStudent(student.i)}
          unselectButton={true}
        />
      ))}
    </div>
  );
};

export default ClickedStudents;
