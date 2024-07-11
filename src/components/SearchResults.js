import React from 'react';
import Track from './Track';
import styles from './SearchResults.module.css';
            
function SearchResults ({setPlaylist, results, showFailMessage, failMessage}) {
    
    return (
        <div className={styles.searchResultsContainer} >
            {results.length === 0 ? (
                showFailMessage ? <div className={styles.message}>{failMessage}</div> : null) :
                    <div className={styles.tableHeading}>
                        <h2>Search results</h2>
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

export default SearchResults;