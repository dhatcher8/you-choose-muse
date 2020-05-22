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
          // console.log(accessToken);
          spotifyWebApi.setAccessToken(accessToken);
        } else {
            console.log("Error getting token");
        }
    }

    getHashParams() {
          var curr_hash = window.location.hash;
        //   console.log(curr_hash);
          var parts = curr_hash.split('=');
          var accessToken = parts[1];
        //   console.log(accessToken);
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
 