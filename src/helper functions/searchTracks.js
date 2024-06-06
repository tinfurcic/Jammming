async function searchTracks (searchString, setResults, accessTokenTemp) {
    if (searchString.trim() === '') {
        setResults([]);
        return; 
    }

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessTokenTemp
      }
    }

    const fetchLink = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(searchString) + '&type=track&limit=10';

    const searchForItemResponse = await fetch (fetchLink, searchParameters);
    if (searchForItemResponse.ok) {
        const data = await searchForItemResponse.json();
        setResults(data.tracks.items);
    }
    else {
        console.error("Searching failed.")
    }
}

export default searchTracks;