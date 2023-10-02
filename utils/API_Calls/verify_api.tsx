import {SHA256, GenerateKeys, Encryption_AES} from "../Encryption"
const SERVER_IP = process.env.SERVER_IP

export const handleVerifyOTP = async (user: any) => {
    try {
      const passHash = SHA256(user.pass)
      const Keys = GenerateKeys()
      const privKey = Keys.privKey
      const privKey_encrypt = Encryption_AES(privKey, user.pass) 
      const res = await fetch(
          SERVER_IP +"/users/login/first", {
              method: "POST",
              body: JSON.stringify({
                roll: user.id,
                authCode: user.auth,
                passHash: passHash,
                pubKey: Keys.pubKey,
                privKey: privKey_encrypt,
                data: ""
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
