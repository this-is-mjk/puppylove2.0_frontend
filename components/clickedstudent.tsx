import React from "react";
import Card from "./selectcard";
import "./clickedstudent.css";

interface ClickedStudentsProps {
  clickedStudents: Student[];
  onUnselectStudent: (studentRoll: string) => void;
}

const ClickedStudents: React.FC<ClickedStudentsProps> = ({ clickedStudents, onUnselectStudent }) => {
  return (
    <div className="clicked-students-container">
      <h2>Clicked Students:</h2>
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
