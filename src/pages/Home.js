import React, { Component } from 'react'

import Spotify from 'spotify-web-api-js';

import SearchArtist from "../components/SearchArtist";

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
            <div className="App">
              <div> Now Playing: { this.state.nowPlaying.name } </div>
              <div>
                <img src={ this.state.nowPlaying.image } style={{width: 200}} />
              </div>
              <button onClick={() => this.getNowPlaying()}>
                Check Now Playing
              </button>
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
                <button>
                    Generate
                </button>  
              </div>
            </div>
      
            
          )
    }
}
 