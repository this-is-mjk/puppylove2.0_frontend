import {SHA256, Encryption, RandInt, Decryption} from "../Encryption"
import { PubK } from "../UserData"
const SERVER_IP = process.env.SERVER_IP

export const SendHeart = async(senderId: string, receiverIds: string []) => {
    try {
        const enc : string[] = []
        const sha : string[] = []
        const ids_encrypt: string[] = []
        const R1: number = parseInt(senderId)
        for(const id of receiverIds) {
            const R2: number = parseInt(id)
            const random = await RandInt()
            const R3: string = random.toString()
            const pubKey: string|null = await get_pubKey(id)
            if(pubKey === null) {
                throw new Error("Error")
            }
            if(R1 < R2) {
                const sha_:string = await SHA256(R1.toString() + R2.toString() + R3)
                sha.push(sha_)
                const enc_:string = await Encryption(sha_, pubKey)
                enc.push(enc_)
            }
            else {
                const sha_:string = await SHA256(R2.toString() + R1.toString() + R3)
                sha.push(sha_)
                const enc_:string = await Encryption(sha_, pubKey)
                enc.push(enc_)
            }
            const id_encrypt:string = await Encryption(R2.toString() + '+' + R3, PubK)
            ids_encrypt.push(id_encrypt)
        }
        const res = await fetch(
            `${SERVER_IP}/users/sendheartVirtual`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    "hearts": {
                        "heart1": {
                            "enc": enc[0],
                            "sha": sha[0],
                            "id_encrypt": ids_encrypt[0]
                        },
                        "heart2": {
                            "enc": enc[1],
                            "sha": sha[1],
                            "id_encrypt": ids_encrypt[1]
                        },
                        "heart3": {
                            "enc": enc[2],
                            "sha": sha[2],
                            "id_encrypt": ids_encrypt[2]
                        },
                        "heart4": {
                            "enc": enc[3],
                            "sha": sha[3],
                            "id_encrypt": ids_encrypt[3]
                        }
                    }
                }),
            }
        );
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }
        return true
    }
    catch(err) {
        console.log(err)
        return false
    }
  }

  async function get_pubKey (id: string) {
    try {
        const res = await fetch(
            `${SERVER_IP}/users/fetchPublicKeys`, {
                method: "GET",
                credentials: "include"
            }
            )
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
            }
            const res_json = await res.json()
            for (const publicKey of res_json) {
                if (publicKey._id === id) {
                    return publicKey.pubKey;
                }
            }
            throw new Error("Public Key Not Found")
    }
    catch(err) {
        console.log(err)
    }
  }