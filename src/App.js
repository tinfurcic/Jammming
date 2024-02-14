import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';

function App() {

  // These are client credentials.
  // Remember to recreate and encrypt this before pushing it to a public repository.
  var client_id = '828454fbd2c14ce993f835d9a85ddc23';
  var client_secret = '703c6976fc9f48e8a54fd3d988423c5f';

  const [accessToken, setAccessToken] = useState('');

// Once, after the initial render, a POST request is sent to obtain a token with which the app can make API calls on user's behalf.
  // The token's lifespan is 1 hour, so read and do this later
    // https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  const [playlist, setPlaylist] = useState([]); // playlist will be an array of objects (= a list of songs)

  // SearchResults needs to be able to add tracks to the playlist (hence passing setPlaylist to SearchBar).
  // Playlist needs to be able to delete tracks from the playlist,
    // and to display the playlist (hence passing playlist and setPlaylist to Playlist).
  return ( 
    <div className="App">
      <SearchBar setPlaylist={setPlaylist} accessToken={accessToken}/>
      <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
    </div>
  );
}

export default App;

/*
Component tree
                                      App
                                    /     \
                            SearchBar     Playlist ___
                            /               /    |    \
                      SearchResults     Track   ...   Track
                    /       |       \
                Track      ...      Track
*/
