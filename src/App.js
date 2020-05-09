
import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Spotify from 'spotify-web-api-js';

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Playlist from "./pages/CreatedPlaylist";

const spotifyWebApi = new Spotify();

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/playlist" component={Playlist}/>
        </div>
      </div>
    )
  }
}




export default App;
