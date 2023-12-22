const SERVER_IP = process.env.SERVER_IP

export const confirmationToPublish = async() => {
    try {
        const response = await fetch(`${SERVER_IP}/users/publish`, {
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('API request successful');
        
        } else {
          console.error('API request failed');
        }
    } catch (error) {
        console.error('Error during API request', error);
    } 
}