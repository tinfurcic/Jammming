import React from 'react';
import Track from './Track';
import styles from './SearchResults.module.css';
            
function SearchResults ({setPlaylist, results, showFailMessage}) {

    const failMessage = "Oops! An error occurred. Playlist is not saved."
    
    return (
        <div className={styles.searchResultsContainer} >
            {results.length === 0 ? (
                showFailMessage ? <div className={styles.message}>{failMessage}</div> : null) :
                    <div className={styles.tableHeading}>
                        <h2>Results:</h2>
                    </div>
            }
            <ul>
                {results.map((result) =>
                <li key={result.uri}>
                    <Track trackInfo={result} setPlaylist={setPlaylist} parent="SearchResults"/>
                </li>)}
            </ul>
        </div>            
    );
}
// Feature suggestion: when results.length === 0, display Spotify's Recommendations, based on user's data.
    // This can be done automatically, or after pressing the displayed "Need recommendations?" button first.

export default SearchResults;