const SERVER_IP = process.env.SERVER_IP

export const handleRegister = async (id: string) => {
  try {
    const res = await fetch(
      SERVER_IP + "/users/mail/" + id, {
      method: "POST"
    }
    );
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }
    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}