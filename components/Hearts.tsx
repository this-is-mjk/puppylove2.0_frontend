import React from 'react';
import '../styles/claimedhearts.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GrUserFemale } from 'react-icons/gr';
import { GrUser } from 'react-icons/gr';
import {
  heartsReceivedFromFemales,
  heartsReceivedFromMales,
} from '../utils/UserData';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const style = { display: 'flex', gap: '10px', alignItems: 'center' };
function Hearts() {
  return (
    <div className="recieved-box">
      <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Caught !</div>
      <div className="heart-container" style={style}>
        <GrUserFemale fontSize="large" />
        <div className="hearts">
          <FavoriteIcon color="secondary" fontSize="large" />
          <span>x{heartsReceivedFromFemales}</span>
        </div>
      </div>
      <div className="heart-container" style={style}>
        <GrUser fontSize="large" />
        <div className="hearts">
          <FavoriteIcon color="secondary" fontSize="large" />
          <span>x{heartsReceivedFromMales}</span>
        </div>
      </div>
    </div>
  );
}

export default Hearts;
