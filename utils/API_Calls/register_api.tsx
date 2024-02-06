const SERVER_IP = process.env.SERVER_IP

export const handleRegister = async (id: string) => {
  try {
    const res = await fetch(
      SERVER_IP + "/users/mail/" + id, {
      method: "POST"
    }
    );
    // console.log(res)
    if (!res.ok && res.status == 403) {
      console.log(`HTTP Error: ${res.status} - ${res.statusText}`);
    }
    return res;
  }
  catch (err) {
    console.log(err)
    throw err
  }
}