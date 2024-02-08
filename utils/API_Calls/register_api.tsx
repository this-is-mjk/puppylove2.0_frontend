const SERVER_IP = process.env.SERVER_IP;

export const handleRegister = async (id: string, recaptchaToken: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("g-recaptcha-response", recaptchaToken);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: "",
      redirect: 'follow'
    };

    const response = await fetch(SERVER_IP + "/captcha/user/mail/" + id, requestOptions);

    if (!response.ok && response.status === 403) {
      console.log(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.text();
    console.log(result);

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
