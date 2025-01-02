import crypto from 'crypto';
import { Decryption_AES, Encryption_AES, SHA256 } from './Encryption';

const SERVER_IP = process.env.SERVER_IP;

// Function to generate a single recovery code using a number
export const generateRecoveryCode = (id: any) => {
  // Some relation with the id
  const hash = crypto.createHash('sha256').update(id.toString()).digest('hex');
  // Random index to slice 8 characters from the hash
  const randomIndex = Math.floor(Math.random() * (hash.length - 8)); // Ensure we don't go out of bounds
  const randomSlice = hash.slice(randomIndex, randomIndex + 8);
  // Random bytes to add to the recovery code
  const randomBytes = crypto.randomBytes(8).toString('hex');

  // Combine the hash and random bytes
  return `${randomSlice}-${randomBytes.slice(0, 8)}`;
};

export const setUpRecoveryCode = async (pass: any, code: any) => {
  try {
    const passHash = await SHA256(pass);
    // encrypt the pass
    const encryptedPass = await Encryption_AES(pass, code);
    // send request to save the encrypted pass in the backend
    const res = await fetch(SERVER_IP + '/users/addRecovery', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        passHash: passHash,
        code: encryptedPass,
      }),
    });
    const res_json = await res.json();
    if (!res.ok) {
      throw new Error(res_json.error);
    }
    return {
      success: true,
      message: res_json.message,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getRecoveryCode = async (id: string) => {
  try {
    const res = await fetch(SERVER_IP + '/users/retrive', {
      method: 'POST',
      body: JSON.stringify({
        _id: id,
      }),
    });
    const res_json = await res.json();
    if (!res.ok) {
      throw new Error(res_json.error);
    }
    return {
      success: true,
      message: res_json.message,
      pass: res_json.code,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
