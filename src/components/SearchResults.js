import React from 'react';
import Track from './Track';
import styles from './SearchResults.module.css';
            
function SearchResults ({setPlaylist, results, showResults, showFailMessage, failMessage, pairs, setIsModified, isPlaylistLoading}) {
    
    return (
        <div className={styles.searchResultsContainer} >
            {showResults ? (
                <>
                    {results.length !== 0 ? (
                    <div className={styles.tableHeading}>
                        <h2>Search results</h2>
                    </div>
                    ) : null}
                    <ul>
                        {results.map((result) =>
                        <li key={result.uri}>
                            <Track trackInfo={result} setPlaylist={setPlaylist} parent="SearchResults" pairs={pairs} setIsModified={setIsModified} isPlaylistLoading={isPlaylistLoading} />
                        </li>)}
                    </ul>
                </>
            ) : (
                showFailMessage ? <div className={styles.message}>{failMessage}</div> : null
            )}
        </div>            
    );
}

export default SearchResults;