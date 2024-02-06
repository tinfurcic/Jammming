import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';

function App() {

    const [list, setList] = useState([]); // list will be an array of objects (= a list of songs)


  // SearchResults needs to be able to add tracks to the playlist (hence passing setList to SearchBar).
  // Playlist needs to be able to delete tracks from the playlist,
  // and to display the playlist (hence passing list and setList to Playlist).
  return ( 
    <div className="App">
      <SearchBar setList={setList}/>
      <Playlist list={list} setList={setList}/>
    </div>
  );
}

export default App;


/*
Component tree
                                      App
                                    /     \
                            SearchBar     Playlist
                            /
                      SearchResults
*/
