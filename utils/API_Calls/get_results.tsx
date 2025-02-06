import { Decryption } from '../Encryption';
import { setAdminPublished, setMatchedIds, PrivK } from '../UserData';

let matchedId: string[] = [];

const SERVER_IP = process.env.SERVER_IP;
// GET request for IDs with whom user got matched and storing in Matched_Ids array
export const get_result = async () => {
  try {
    const res = await fetch(`${SERVER_IP}/users/mymatches`, {
      method: 'GET',
      credentials: 'include', // For CORS
    });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }
    const res_json = await res.json();
    console.log(res_json);
    if (res_json.matches) {
      setAdminPublished(true);
      matchedId = Object.keys(res_json.matches);
      // matchedId = res_json.matches as string[];
      setMatchedIds(matchedId);

      const songs: string[] = Object.values(res_json.matches);
      console.log('Songs:', songs);
      let x = await Decryption(songs[0], PrivK);
      console.log(x);
      // console.log(Decryption(songs[0], PrivK));
    }
  } catch (err) {
    console.log(err);
    alert('Error in Fetching Results');
  }
};
