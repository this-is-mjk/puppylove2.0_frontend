import { Decryption, Decryption_AES } from '../Encryption';
import { PrivK, Sent_Hearts, Hearts } from '../UserData';
const SERVER_IP = process.env.SERVER_IP;

export const FetchReturnedHearts = async () => {
  const res = await fetch(`${SERVER_IP}/users/fetchReturnHearts`, {
    method: 'GET',
    credentials: 'include', // For CORS
  });
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
  }
  const data = await res.json();
  // console.log(data)
  await Promise.all(
    data.map(async (elem: any) => {
      const encoded_sha = elem.enc;
      const sha = await Decryption(encoded_sha, PrivK);

      if (sha === 'Fail') {
        return;
      }

      // console.log(sha)

      for (const key in Sent_Hearts) {
        const heart = Sent_Hearts[key as keyof Hearts];
        const my_sha = await Decryption_AES(heart.sha_encrypt, PrivK);
        // console.log(my_sha)
        if (my_sha === sha) {
          const id_plain: string = await Decryption(heart.id_encrypt, PrivK);
          // console.log(id_plain)
          await match(encoded_sha, id_plain);
        }
      }
    })
  );
};

const match = async (enc: string, id_plain: string) => {
  const res = await fetch(`${SERVER_IP}/users/verifyreturnhearts`, {
    method: 'POST',
    credentials: 'include', // For CORS
    body: JSON.stringify({
      enc: enc,
      secret: id_plain,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
  }
  // console.log(`THERE IS A MATCH ${id_plain.slice(0,6)} ${id_plain.slice(6,12)}`)
};
