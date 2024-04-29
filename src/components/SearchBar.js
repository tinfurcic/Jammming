import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import Playlist from './Playlist';


// Possible additions:
    // Allow the user to search for artists and albums (and something else?), not only songs
function SearchBar ({accessToken, accessTokenNew, setAccessTokenNew, setAccessTokenData}) {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value
        setSearchText(value);
        search(value);
    }

    const searchType ='track';
        // later, add a checkbox input which enables search by type (artist/album/playlist/track/show/episode/audiobook)
        // do you want to save those choices in a state?
        // leaving this blank or choosing multiple resource types complicates the fetch link format
            // this should also be solved using encodeURIComponent()

    async function search (searchString) {
        if (searchString.trim() === '') {
            setResults([]);
            return; 
        }

        const searchParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }
    
        // This line is used to search for `searchString` resources of the type `searchType` (currently track), and
            // it saves the results to the `results` array.
            // encodeURIComponent is used to avoid errors produced by including some special characters in the search string
        const fetchLink = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(searchString) + '&type=' + searchType + '&limit=10';

        await fetch(fetchLink, searchParameters)
            .then(response => response.json()) 
            .then(data => {
                // console.log(data.tracks.items); // debugging
                // console.log(accessToken); // debugging
                setResults(data.tracks.items);
                }
            )
            .catch(error => console.error('There was a problem with the fetch operation:', error));
      } 
    
    // warning: some code below might be for test purposes only
    return (
            <div className={styles.searchBarContainer}>
                <div className={styles.bar}>
                    <form>
                        <label htmlFor="searchBar" >Search: </label>
                        <input id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder="Enter a song name..." />
                    </form>
                </div>
                <div className={styles.lists}>
                        <SearchResults setPlaylist={setPlaylist} results={results}/>
                        <Playlist playlist={playlist} setPlaylist={setPlaylist} accessTokenNew={accessTokenNew} setAccessTokenNew={setAccessTokenNew} setAccessTokenData={setAccessTokenData} />                        
                </div>
                
            </div> 
    );
}

export default SearchBar;