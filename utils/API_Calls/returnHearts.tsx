import { Encryption } from '../Encryption';
import {
  Claims,
  ReturnHearts,
  ReturnHearts_Late,
  Claims_Late,
  receiverIds,
  receiverSongs,
} from '../UserData';
import { get_pubKey } from './Send_Heart';
const SERVER_IP = process.env.SERVER_IP;

export const returnHearts = async (selectedSongs: {
  [key: string]: string | null;
}) => {
  // console.log(Claims)
  for (let i = 0; i < Claims.length; i++) {
    const sha = Claims[i].sha;
    for (let j = 0; j < 4; j++) {
      if (receiverIds[j] === '') {
        continue;
      }
      let song = selectedSongs[receiverIds[j]];
      const pubKey = await get_pubKey(receiverIds[j]);
      if (song) {
        song = await Encryption(song, pubKey);
      } else {
        song = '';
      }
      const enc = await Encryption(sha, pubKey);
      ReturnHearts.push({ enc: enc, sha: sha, songID_enc: song });
    }
  }
};

export const returnHearts_Late = async () => {
  if (Claims_Late.length === 0) {
    return;
  }
  // console.log(Claims_Late);
  for (let i = 0; i < Claims_Late.length; i++) {
    const sha = Claims_Late[i].sha;
    for (let j = 0; j < 4; j++) {
      if (receiverIds[j] === '') {
        continue;
      }
      const pubKey = await get_pubKey(receiverIds[j]);
      let song = receiverSongs[j];
      if (song != '') {
        song = await Encryption(song, pubKey);
      } else {
        song = '';
      }
      const enc = await Encryption(sha, pubKey);
      ReturnHearts_Late.push({ enc: enc, sha: sha, songID_enc: song });
    }
  }
  const res = await fetch(`${SERVER_IP}/special/returnclaimedheartlate`, {
    method: 'POST',
    credentials: 'include', // For CORS
    body: JSON.stringify({
      returnhearts: ReturnHearts_Late,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
  }
};
