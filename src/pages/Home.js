import React, { Component } from 'react'

import Spotify from 'spotify-web-api-js';
// import from 'query-string'

import SearchArtist from "../components/Search/SearchArtist";
import SearchTrack from "../components/Search/SearchTrack";
import GenreSelect from "../components/GenreSelect/GenreSelect";
import PlaylistLength from "../components/PlaylistLength/PlaylistLength";
import PlaylistGenerator from "../components/PlaylistGenerator/PlaylistGenerator";
import Header from "../components/Header/Header";

import '../App.css';

const queryString = require('query-string');

export const spotifyWebApi = new Spotify();
export var globalPlaylistName = "";

export default class Home extends Component {
    
    constructor(){
        super();
        
        const accessToken = this.getHashParams();
        this.state = {
          loggedIn: accessToken ? true : false,
          nowPlaying: {
            name: 'Not Checked',
            image: '',
            playlistName: '',
          }
        }
        if (accessToken) {
          // console.log(accessToken);
          spotifyWebApi.setAccessToken(accessToken);
        }
    }
    
    getHashParams() {
    //  var hashParams = {};
    //  var e, r = /([^&;=]+)=?([^&;]*)/g,
    //     q = window.location.hash.substring(1);
    //  while ( e = r.exec(q)) {
    //     hashParams[e[1]] = decodeURIComponent(e[2]);
    //  }
    //  return hashParams;

      var curr_hash = window.location.hash;
      console.log(curr_hash);
      // console.log(window.location.hash);

      var parts = curr_hash.split('=');
      var accessToken = parts[1];
      console.log(accessToken);
      return accessToken;

      // var access_token = new URLSearchParams(curr_url.search).get('access_token');
      // console.log(access_token);


      // let parsed = queryString.parse(window.location.search);
      // console.log(parsed);
      // let accessToken = parsed.access_token;
      // console.log(accessToken);
      // return accessToken;
     
    }

    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            this.setState({
              nowPlaying: {
                name: response.item.name,
                image: response.item.album.images[0].url
              }
            })
          })
          .catch(e => {
            console.error(e);
            this.setState({
              nowPlaying: {
                name: 'No Song Currently Playing',
              }
            })
          })
    }

    updatePlaylistName(event) {
        this.setState({playlistName: event.target.value});
        globalPlaylistName = event.target.value;
    }


    render() {
        return (
            <div>             
                <Header/>
                <div className="App">
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
 