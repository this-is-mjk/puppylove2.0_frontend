const SERVER_IP = process.env.SERVER_IP

export const confirmationToPublish = async() => {
    try {
        const res = await fetch(`${SERVER_IP}/users/publish`, {
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          return {"success": true, "error":""}
        }
        console.log(`HTTP Error: ${res.status} - ${res.statusText}`);
        const res_json = await res.json()
        return {"success": false, "error": res_json.error as string}
    } catch (error) {
        console.error('Error during API request', error);
        return {"success": false, "error": error}
    } 
}