import { use } from 'react';
import {
  Decryption,
} from '../Encryption'; 
import { PrivK } from "../UserData"
const SERVER_IP = process.env.SERVER_IP

let decodedHearts : Array<any> = [] 
export let heartsReceivedFromMales : number = 0
export let heartsReceivedFromFemales : number = 0

export function Set_heartsMale(heartsMales : number) {
  heartsReceivedFromMales = heartsMales
}

export function Set_heartsFemale(heartsFemales : number) {
  heartsReceivedFromFemales = heartsFemales
}


export const receivedHeart = async() => {
    try{
        const res = await fetch(`${SERVER_IP}/fetchall`, {
            method: "GET"
        });
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }else{
            const data = await res.json()
            decodedHearts = data.map((element : any) => {
                const encoded_sha = element.enc
                const gender = element.gender_of_sender
                const decrypted_sha = Decryption(encoded_sha, PrivK)

                return {
                    enc : decrypted_sha,
                    genderOfSender : gender
                }
            })
        }

    }catch (err){
        console.error('Error while fetching and decrypting data', err);
    }
}


export const sendDecordedSHA = async (decodedHearts: any) => {
    try {
        const response = await fetch(`${SERVER_IP}/sentHeartDecoded`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ DecodedHearts: decodedHearts }),
        });
  
        if (response.ok) {
          const data = await response.json();
          Set_heartsMale(data.male)
          Set_heartsFemale(data.female)
        } else {
          console.error('Failed to send decoded hearts');
        }
    } catch (error) {
        console.error('Error while sending decoded hearts', error);
    }
}


receivedHeart()
  .then(() => {
    sendDecordedSHA(decodedHearts);
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });

//   export heartsReceivedFromFemales;
//   export heartsReceivedFromMales; 

