import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchResults from './SearchResults';
import Playlist from './Playlist';


function SearchBar ({accessTokenTemp, accessToken, setAccessToken, isSaving, setIsSaving}) {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);


    const handleChange = (event) => {
        const value = event.target.value
        setSearchText(value);
        search(value);
    }

    const searchType ='track';
        // later, add advanced search options

    async function search (searchString) {
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
    
        const fetchLink = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(searchString) + '&type=' + searchType + '&limit=10';
        await fetch(fetchLink, searchParameters)
            .then(response => response.json()) 
            .then(data => {
                setResults(data.tracks.items);
                }
            )
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    } 
    
    return (
            <div className={styles.searchBarContainer}>
                <div className={styles.bar}>
                    <form>
                        <label htmlFor="searchBar" >Search: </label>
                        <input id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder="Enter a song name..." />
                    </form>
                </div>
                <div className={styles.lists}>
                        <SearchResults setPlaylist={setPlaylist} results={results} showFailMessage={showFailMessage} />
                        <Playlist playlist={playlist} setPlaylist={setPlaylist} accessToken={accessToken} setAccessToken={setAccessToken} isSaving={isSaving} setIsSaving={setIsSaving} setSearchText={setSearchText} setResults={setResults} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setShowFailMessage={setShowFailMessage} />                        
                </div>
                
            </div> 
    );
}

export default SearchBar;