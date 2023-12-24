"use client"
import { Student } from '@/utils/API_Calls/search';
import MatchedCard from './card';
import {useEffect} from "react"
import {search_students} from "../utils/API_Calls/search"
import { get_result } from '@/utils/API_Calls/get_results';
import { Matched_Ids } from '@/utils/UserData';

const Results = () => {
    let Matches: Student[] = []


    useEffect(() => {
       // Fetching Data of the Matched_Ids for Displaying
          const display_result = async() => {
            await get_result();
            for(let j=0; j < Matched_Ids.length; j++) {
                const data: Array<Student> = search_students(Matched_Ids[j]);
                if(!data.length) {
                    return;
                }
                const student = data[0];
                Matches.push(student)
            }
            console.log(Matches)
        }
        display_result();
    }, [])

    console.log(Matches)
  return (
    <div>
      {Matches.map((student) => (
        <MatchedCard
          key={student.i}
          student={student}
          matched
        />
      ))}
    </div>
  );
};

export default Results;
