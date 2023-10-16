import {SHA256, Decryption_AES} from "../Encryption"
import {Set_PrivK, Set_PubK, Set_Data} from "../UserData"
const SERVER_IP = process.env.SERVER_IP

export const handleLog = async(data: any) => {
    try {
      const passHash = await SHA256(data.password)
      const res = await fetch(
          SERVER_IP+"/session/login", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                  "_id": data.id,
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
      const res_json = await res.json()
      const pvtKey_Enc: string = res_json.pvtKey_Enc
      const pvtKey_login = await Decryption_AES(pvtKey_Enc, data.password)
      Set_PrivK(pvtKey_login)
      Set_PubK(res_json.pubKey)
      await Set_Data(res_json.data)
      return true
    }
    catch(err) {
      console.log(err)
      return false
    }
  }