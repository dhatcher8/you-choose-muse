
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
import LearnMore from "./pages/LearnMore";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import Playlist from "./pages/CreatedPlaylist";
import GetTokenRedirect from "./pages/GetTokenRedirect";
import AboutUs from "./pages/AboutUs";
import ScreenWidthError from "./pages/ScreenWidthError";

const spotifyWebApi = new Spotify();

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/width-error" component={ScreenWidthError}/>
          <Route exact path="/learn-more" component={LearnMore}/>
          <Route exact path="/token" component={GetTokenRedirect}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/recently-played" component={RecentlyPlayed}/>
          <Route exact path="/top-tracks" component={TopTracks}/>
          <Route exact path="/top-artists" component={TopArtists}/>
          <Route exact path="/playlist" component={Playlist}/>
          <Route exact path="/about-us" component={AboutUs}/>
        </div>
      </div>
    )
  }
}




export default App;
