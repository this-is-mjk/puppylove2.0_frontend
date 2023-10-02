
import "./hello.css";
// import "../app/(landing)/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import StudentCard from "../components/StudentCard";
import Card from "@/components/card";

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

export default function Hello() {
  const [searchQuery, setSearchQuery] = useState("");
  const students: Student[] = [
    {
      "_id": "1",
      "b": "B+",
      "d": "COMPUTER SCIENCE & ENGG.",
      "g": "M",
      "h": "HALL5",
      "n": "Pratham Sahu",
      "p": "Btech",
      "r": "G-319"
    },
    {
      "_id": "2",
      "b": "B+",
      "d": "COMPUTER SCIENCE & ENGG.",
      "g": "M",
      "h": "hall 12",
      "n": "ChayanKumawat",
      "p": "Btech",
      "r": "B-410"
    },
    {
      "_id": "3",
      "b": "A-",
      "d": "ELECTRICAL ENGINEERING",
      "g": "F",
      "h": "HALL3",
      "n": "Alisha Sharma",
      "p": "Btech",
      "r": "E-205"
    },
    {
      "_id": "4",
      "b": "A",
      "d": "MECHANICAL ENGINEERING",
      "g": "M",
      "h": "HALL7",
      "n": "Rahul Verma",
      "p": "Btech",
      "r": "M-101"
    },
    {
      "_id": "5",
      "b": "B-",
      "d": "CIVIL ENGINEERING",
      "g": "F",
      "h": "HALL9",
      "n": "Sneha Kapoor",
      "p": "Btech",
      "r": "C-512"
    },
    {
      "_id": "6",
      "b": "A",
      "d": "ELECTRONICS & COMMUNICATION",
      "g": "M",
      "h": "HALL2",
      "n": "Ankit Patel",
      "p": "Btech",
      "r": "E-402"
    },
    {
      "_id": "7",
      "b": "A+",
      "d": "CHEMICAL ENGINEERING",
      "g": "M",
      "h": "HALL11",
      "n": "Neha Gupta",
      "p": "Btech",
      "r": "C-701"
    },
    {
      "_id": "8",
      "b": "A+",
      "d": "CHEMICAL ENGINEERING",
      "g": "M",
      "h": "HALL11",
      "n": "Neha Gupta",
      "p": "Btech",
      "r": "C-701"
    },


  ];

  const filteredStudents = students.filter((student) =>
    student.n.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="box">
      <div>
        <div className="container">
          <div className="section-1">
            <div className="image-container">
              <div className="image-box">
                <Image
                  src="/Dog.jpg"
                  width={160}
                  height={160}
                  alt="Profile"
                  className="image"
                />
              </div>
              <div className="detail">
                <p className="details-text">yoasahshhqshhdhw</p>
                <p className="details-text">asahshhqshhdhw</p>
                <p className="details-text">ahshhqshhdhw</p>
                <p className="details-text">ahshhqshhdhw</p>
              </div>
            </div>
            <div className="heart"></div>
          </div>
          <div className="section-2">
            <div className="search-div">
              <BsSearch className="icon" />
              <input
                type="text"
                className="search-bar details-text "
                placeholder="Enter Name To Search."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="student-container">
              {filteredStudents.map((student) => (
                <Card key={student._id} student={student} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
