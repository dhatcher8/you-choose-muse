import React, { Component } from 'react'

import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export default class Welcome extends Component {
    
    render() {
        return (
          <div className="App">
            <a href='http://localhost:8888'>
              <button>Login with Spotify</button>
            </a>
          </div>

        )
    }
}
 