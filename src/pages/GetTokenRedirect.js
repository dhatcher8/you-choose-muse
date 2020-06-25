import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

import Spotify from 'spotify-web-api-js';

export const spotifyWebApi = new Spotify();

export default class Welcome extends Component {
    
    constructor(){
        super();
        const accessToken = this.getHashParams();
        this.state = {
          loggedIn: accessToken ? true : false,
        }
        if (accessToken) {
          spotifyWebApi.setAccessToken(accessToken);
        } else {
            console.log("Error getting token");
        }
    }

    getHashParams() {
          var curr_hash = window.location.hash;
          var parts = curr_hash.split('=');
          var accessToken = parts[1];
          return accessToken;

        }

    render() {
        return (
          <div className="App">
            <Redirect to='/home'/>;
          </div>
        )
    }
}
 