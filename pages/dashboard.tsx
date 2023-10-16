
import "./hello.css";
// import "../app/(landing)/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import FavoriteIcon from '@mui/icons-material/Favorite'
import StudentCard from "../components/StudentCard";
import Card from "@/components/card";
import Hearts from "@/components/Hearts";

interface Student {
  _id: string;
  b: string;
  d: string;
  g: string;
  h: string;
  n: string;
  p: string;
  r: string;
  i: string;
}

export default function Hello() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Generate the access_token only once when the component is loaded
    if (!access_token) {
      fetchAccessToken();
    }
  }, [access_token]);

  const config = {
    APP_ID: "data-yubip",
    API_KEY: "XvhvZNBWObiDyf651zDE8LsSx59zssBKVMlTHSftn566l7rXoVrbQxnW0L2p6L5A",
    cluster_name: "Cluster0",
    db_name: "student_data",
    collection_name: "student_data",
  };

  const fetchAccessToken = async () => {
    try {
      const response = await fetch(`https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${config.APP_ID}/auth/providers/api-key/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: config.API_KEY,
        }),
      });
      const data = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const fetchDate = async (search: string) => {
    try {
      if (!access_token) {
        console.error("Access token is not available.");
        return [];
      }

      const student_data = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/${config.APP_ID}/endpoint/data/v1/action/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          dataSource: config.cluster_name,
          database: config.db_name,
          collection: config.collection_name,
          filter: {
            $or: [
              {
                n: {
                  $regex: search,
                  $options: 'i',
                },
              },
              {
                i: {
                  $regex: search,
                  $options: 'i', 
                },
              },
            ],
          },
          limit: 20,
        }),
      });

      const response = await student_data.json();
      // console.log(response.documents);
      return response.documents;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      const studentData = await fetchDate(searchQuery);
      setStudents(studentData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const filteredStudents = students.filter((student) =>
  student.n.toLowerCase().includes(searchQuery.toLowerCase()) ||
  student.i.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="heart">
              <Hearts/>
            </div>
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
