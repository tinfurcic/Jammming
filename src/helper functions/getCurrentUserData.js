async function getCurrentUserData(accessToken) {
    const currentUserDataResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {  
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (currentUserDataResponse.ok) {
        const currentUserData = await currentUserDataResponse.json();
        return currentUserData;
    } else {
        console.error('Failed to get current user id.');
    }
    
}

export default getCurrentUserData;