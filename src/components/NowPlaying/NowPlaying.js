import React, { Component } from 'react'

import Spotify from 'spotify-web-api-js';

export const spotifyWebApi = new Spotify();

// To use NowPlaying component
// import NowPlaying from "../components/NowPlaying/NowPlaying";
// and put <NowPlaying/> in the HTML

export default class NowPlaying extends Component {
    
    constructor(){
        super();
        this.state = {
          nowPlaying: {
            name: 'Not Checked',
            image: '',
            playlistName: '',
          }
        }
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

    render() {
        return (       
            <div className="App">
                <div> Now Playing: &nbsp; { this.state.nowPlaying.name } </div>
                <div>
                    <img src={ this.state.nowPlaying.image } style={{width: 200}} />
                </div>
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
            </div>
          )
    }
}
 