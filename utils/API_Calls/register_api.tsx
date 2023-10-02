const SERVER_IP = process.env.SERVER_IP

// email is actually roll number here
// backend api made for roll no. but Frontend asks for emails
export const handleRegister = async(email: string) => {
    try {
      const res = await fetch(
          SERVER_IP +"/users/mail/"+email, {
              method: "POST"
          }
      );
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
      }
      return true
    }
    catch(err) {
      console.log(err)
      return true
    }
  }