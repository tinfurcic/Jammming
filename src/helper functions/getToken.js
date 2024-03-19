const getToken = async () => {

// These are client credentials.
    // Remember to recreate and encrypt this before pushing it to a public repository.
    const client_id = '828454fbd2c14ce993f835d9a85ddc23';
    const client_secret = '703c6976fc9f48e8a54fd3d988423c5f';

    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    };

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
};

export default getToken;

