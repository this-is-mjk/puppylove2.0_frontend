"use client"

import { Matches } from '@/utils/UserData';
import MatchedCard from './matched_card';
import '../styles/result-card.css'

const Results = () => {

  return (
    <div className="matched-div">
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
