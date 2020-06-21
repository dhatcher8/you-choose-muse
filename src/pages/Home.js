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
        if (spotifyWebApi.getAccessToken() == null) {
            return (
                <div>
                    <Header/>
                    <div className="warning-logout-container">
                        <div className="warning-sub-container">
                            Uh oh, you've been logged out! Go back to the home screen and login!
                        </div>
                    </div>
                </div>
            );
        } else {

            return (
                <div>             
                    <Header/>
                    <div className="background-div-navy">
                        {/* <div className="general-div">
                            <button onClick={() => this.goToRecentlyPlayed()}> See Recently Played</button>
                            <button onClick={() => this.goToTopTracks()}> See Your Top Tracks</button>
                            <button onClick={() => this.goToTopArtists()}> See Your Top Artists</button>
                        </div>
                        <div className="general-div">
                            
                        </div> */}
                        <h3 className="title-text-with-select text-color-pink">Build Your Playlist!</h3>
                        <div className="general-builder-element-div">
                            <div className="builder-elements-right-align">
                                <h3 className="sub-title-text-home">Playlist Name: &nbsp; </h3>
                            </div>
                            <div className="builder-elements-left-align">
                                <input type="text"  
                                placeholder="Playlist Name..."
                                value={this.state.playlistName}
                                maxlength="35"
                                className="text-input"
                                onChange={this.updatePlaylistName.bind(this)}
                                />
                            </div>
                        </div>
                        <PlaylistLength/>
                        <div className="builder-lone-text text-bold" >
                            Choose up to 5 artists, tracks, and genres!
                        </div>
                        <SearchArtist/>
                        <SearchTrack/>
                        <GenreSelect/>
                        <PlaylistGenerator/>

                    </div>

                </div>

          )
        }
    }
}
 