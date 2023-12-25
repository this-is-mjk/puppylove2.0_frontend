"use client"

import MatchedCard from './card';
import {useEffect, useState} from "react"
import {Student, search_students} from "../utils/API_Calls/search"
import { get_result } from '@/utils/API_Calls/get_results';
import { Matched_Ids, Matches } from '@/utils/UserData';

const Results = () => {

  return (
    <div>
      {Matches.map((student) => (
        // <MatchedCard
        //   key={student.i}
        //   student={student}
        //   matched
        // />
        <div>{student.i}</div>
      ))}
    </div>    
  );
};

export default Results;
