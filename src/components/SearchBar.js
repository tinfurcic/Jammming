import React, { useState } from 'react';
import SearchResults from './SearchResults';

/*
The SearchBar component should read what the user wrote in the search bar (in real time),
    and pass that string to the SearchResults component,
        which will then filter the database (in real time) depending on the search text.
*/

// Possible additions:
    // Allow the user to search for artists and albums (and something else?), not only songs

function SearchBar ({setList}) {
    const [searchText, setSearchText] = useState('');

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    //warning: some code below might be for test purposes only
    return (
        <>
            <div>
                <form>
                    <label for="searchBar" >Search: </label>
                    <input id="searchBar" type="search" onChange={handleChange} value={searchText} placeholder="Enter a song name..." />
                </form>
                {searchText === '' ? null : <p>You searched for: {searchText}</p>}
                <SearchResults searchText={searchText} setList={setList} />
            </div> 
        </>
    );
}

export default SearchBar;