import { Decryption } from "./Encryption"

export let PubK = ""
export let PrivK = ""
export let Data = ""
export let receiverIds: string[] = [] 

export function Set_PrivK(pvtKey_login: string) {
    PrivK = pvtKey_login
}

export function Set_PubK(pubKey_login: string) {
    PubK = pubKey_login
}

interface Heart {
    enc: string;
    sha: string;
    id_encrypt: string;
}
  
interface Hearts {
    heart1: Heart;
    heart2: Heart;
    heart3: Heart;
    heart4: Heart;
}

export async function Set_Data(data: string) {
    if(data === "FIRST_LOGIN") {
        return
    }

    const Data = JSON.parse(data) as Hearts;

    const idEncrypts: string[] = []
    idEncrypts.push(Data.heart1.id_encrypt)
    idEncrypts.push(Data.heart2.id_encrypt)
    idEncrypts.push(Data.heart3.id_encrypt)
    idEncrypts.push(Data.heart4.id_encrypt)

    for(let i=0; i < 4; i++) {
        const id: string = await Decryption(idEncrypts[i], PrivK)
        if(id === null){
            return
        }
        const parts = id.split("+")
        receiverIds.push(parts[0])
        console.log(parts[0])
    }
}