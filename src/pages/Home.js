import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SearchArtist from "../components/Search/SearchArtist";
import SearchTrack from "../components/Search/SearchTrack";
import GenreSelect from "../components/GenreSelect/GenreSelect";
import PlaylistLength from "../components/PlaylistLength/PlaylistLength";
import PlaylistGenerator from "../components/PlaylistGenerator/PlaylistGenerator";
import Header from "../components/Header/Header";

import {spotifyWebApi} from './GetTokenRedirect';

import '../App.css';


export var globalPlaylistName = "";

export default class Home extends Component {
    
    constructor(){
        super();
        console.log(spotifyWebApi);
        this.state = {
          playlistName: '',
          redirect : null,
        }
    }


    updatePlaylistName(event) {
        this.setState({playlistName: event.target.value});
        globalPlaylistName = event.target.value;
    }

    goToRecentlyPlayed() {
      this.setState({ redirect: "../recently-played" });
    }

    goToTopTracks() {
      this.setState({ redirect: "../top-tracks"});
    }

    goToTopArtists() {
      this.setState({ redirect: "../top-artists"});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>             
                <Header/>
                <div className="App">
                    {/* <div className="general-div">
                        <button onClick={() => this.goToRecentlyPlayed()}> See Recently Played</button>
                        <button onClick={() => this.goToTopTracks()}> See Your Top Tracks</button>
                        <button onClick={() => this.goToTopArtists()}> See Your Top Artists</button>
                    </div>
                    <div className="general-div">
                        
                    </div> */}
                    <div className="general-div">
                        Playlist Name: &nbsp;  
                        <input type="text"  
                            placeholder="Playlist Name..."
                            value={this.state.playlistName}
                            maxlength="35"
                            onChange={this.updatePlaylistName.bind(this)}
                            />
                    </div>
                    <div className="general-div">
                        <PlaylistLength/>
                    </div>
                    <div className="general-div" className="written-text">
                        Combine up to 5 artists, tracks, and genres to generate a recommended playlist!
                    </div>
                    <div className="general-div">
                        <SearchArtist/>
                    </div>
                    <div className="general-div">
                        <SearchTrack/>
                    </div>

                </div>
                <div className="general-div">
                    <GenreSelect/>
                </div>
                <div className="general-div">
                    <PlaylistGenerator/>
                </div>
            </div>
      
            
          )
    }
}
 