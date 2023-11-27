import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { heartsReceivedFromFemales, heartsReceivedFromMales } from "../utils/API_Calls/recievedHearts"

const style = { "display": "flex", "gap": "10px", "alignItems": "center" }
function Hearts() {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Your Hearts:</div>
      <div className="heart-container" style={style}>
        <div>Female</div>
        {Array(heartsReceivedFromFemales).fill().map((_, index) => (
          <FavoriteIcon key={`female-heart-${index}`} color="secondary" fontSize="small" />
        ))}

      </div>
      <div className="heart-container" style={style}>
        <div>Male</div>
        {Array(heartsReceivedFromMales).fill().map((_, index) => (
          <FavoriteIcon key={`male-heart-${index}`} color="secondary" fontSize="small" />
        ))}

      </div>



    </div>
  );
}

export default Hearts;
