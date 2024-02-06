import React from 'react';

// This component should access the song database,
    // read the string the user wrote in the search bar,
        // filter the songs from the database which start with that string, 
            // and show the results
// it can, for starters, show only the first 20 results. "Load more" button?

// Clicking on the button near the song (design may vary) should add that song to the playlist currently in making.
    // Upon choosing the first song for the playlist, a nameless playlist (window) containing that song should render

function SearchResults ({searchText, setList}) {
    // dataBase is obtained by the API, somehow.
    const dataBase = [{
        name: "The Ship Song",
        artist: "Nick Cave",
        album: "The Good Son",
        id: 0
    },
    {
        name: "Waterloo",
        artist: "ABBA",
        album: "Waterloo",
        id: 1
    },
    {
        name: "Hertz",
        artist: "Amyl and The Sniffers",
        album: "Comfort To Me",
        id: 2
    },
    {
        name: "Bohemian Rhapsody",
        artist: "Queen",
        album: "Bohemian Rhapsody",
        id: 3
    },
    {
        name: "Space Oddity",
        artist: "David Bowie",
        album: "David Bowie",
        id: 4
    },
    {
        name: "Wonderlust King",
        artist: "Gogol Bordello",
        album: "Super Taranta!",
        id: 5
    },
    {
        name: "Be Prepared",
        artist: "Cheech Marin, Jeremy Irons, Jim Cummings, Whoopi Goldberg",
        album: "The Lion King",
        id: 6
    },
    {
        name: "Basket Case",
        artist: "Green Day",
        album: "Dookie",
        id: 7
    },
    {
        name: "Antonija",
        artist: "Kawasaki 3P",
        album: "Kawasaki 3P",
        id: 8
    }];

    // The search feature is currently very simple: only songs starting with the string in the search bar are filtered.
    let results = [];
    if (searchText) {
        results = dataBase.filter((song) => song.name.toLowerCase().startsWith(searchText.toLowerCase()));
    }


    // Is there a better way to find the answer to "Is this track already on the playlist?"?
    const addToPlaylist = (trackToAdd) => {
        setList((prevList) => {
            if (JSON.stringify(prevList).includes(JSON.stringify(trackToAdd)) === false) {
                return [...prevList, trackToAdd];
            }
            else {
                return prevList;
            };
        });
    }

    //warning: some code below might be for test purposes only
    return (
        <>
        <div>
            <ul>
                {results.map((result) => <li key={result.id} onClick={() => addToPlaylist(result)}>{result.name}</li>)}
            </ul>

        </div>
        </>
    );
}

export default SearchResults;