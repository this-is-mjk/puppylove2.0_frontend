'use client';

// import { Matches } from '@/utils/UserData';
import MatchedCard from './matched_card';
import '../styles/result-card.css';
import { Student } from '@/utils/API_Calls/search';

const Results = (Matches: any) => {
  console.log(Matches);
  return (
    <div className="matched-div">
      {Matches.Matches.map((student: any) => (
        <MatchedCard key={student.i} student={student} matched />
      ))}
    </div>
  );
};

export default Results;
