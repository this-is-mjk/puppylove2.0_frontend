import {SHA256} from "../Encryption"
const SERVER_IP = process.env.SERVER_IP

export const handleLog = async(data: any) => {
    try {
      const passHash = await SHA256(data.password)
      const res = await fetch(
          SERVER_IP+"/session/login", {
              method: "POST",
              body: JSON.stringify({
                  "_id": data.email,
                  "passHash": passHash
              }),

              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          }
      );
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
      }
      else {
        return true
      }
    }
    catch(err) {
      console.log(err)
      return false
    }
  }