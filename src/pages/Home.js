import React, { Component } from 'react'

import Spotify from 'spotify-web-api-js';

import SearchArtist from "../components/Search/SearchArtist";
import SearchTrack from "../components/Search/SearchTrack";
// import GenreSelect from "../components/GenreSelect/GenreSelect";
import GenreSelect from "../components/GenreSelect/GenreSelect";
import Header from "../components/Header/Header";

export const spotifyWebApi = new Spotify();

export default class Home extends Component {
    
    constructor(){
        super();
        const params = this.getHashParams();
        this.state = {
          loggedIn: params.access_token ? true : false,
          nowPlaying: {
            name: 'Not Checked',
            image: '',
            playlistName: '',
          }
        }
        if (params.access_token) {
          spotifyWebApi.setAccessToken(params.access_token);
        }
    }
    
    getHashParams() {
     var hashParams = {};
     var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
     while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
     }
     return hashParams;
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
    }


    render() {
        return (
            <div>             
                <Header/>
                <div className="App">
                    <div>
                        Playlist Name:   
                        <input type="text"  
                            placeholder="Playlist Name..."
                            value={this.state.playlistName}
                            onChange={this.updatePlaylistName.bind(this)}
                            />
                        </div>
                    <div>
                        <SearchArtist/>
                    </div>
                    <div>
                        <SearchTrack/>
                    </div>

                </div>
                <div>
                    <GenreSelect/>
                </div>
                <div>
                    <button>
                        Generate
                    </button>  
                </div>
            </div>
      
            
          )
    }
}
 