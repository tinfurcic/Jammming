const getToken = async () => {

    //const client_id = process.env.REACT_APP_CLIENT_ID;
    //const client_secret = process.env.REACT_APP_CLIENT_SECRET;

    const client_id = '828454fbd2c14ce993f835d9a85ddc23';
    const client_secret = '808bf0952d184a5b84d8db09fe3d374a';

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

