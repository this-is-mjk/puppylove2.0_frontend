import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Hearts() {
  const [heartsReceivedFromMales, setHeartsReceivedFromMales] = useState(4);
  const [heartsReceivedFromFemales, setHeartsReceivedFromFemales] = useState(3);

  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Your Hearts:</div>
      <div>Female</div>
      {Array(heartsReceivedFromFemales).fill().map((_, index) => (
        <FavoriteIcon key={`female-heart-${index}`} color="secondary" fontSize="small" />
      ))}
      <div>Male</div>
      {Array(heartsReceivedFromMales).fill().map((_, index) => (
        <FavoriteIcon key={`male-heart-${index}`} color="secondary" fontSize="small" />
      ))}
    </div>
  );
}

export default Hearts;
