async function findCurrentUserId(accessTokenNew) {
    const currentUserIdResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {  
            'Authorization': 'Bearer ' + accessTokenNew
        }
    });
    if (currentUserIdResponse.ok) {
        const currentUserIdData = await currentUserIdResponse.json();
        return currentUserIdData.id;
    } else {
        console.error('Failed to get current user id.');
    }
    
}

export default findCurrentUserId;