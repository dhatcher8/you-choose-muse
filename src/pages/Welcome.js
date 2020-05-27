import React, { Component } from 'react'
import logoBig from '../images/logo-big.png'
import logoWithTextBig from '../images/logo-with-text-big.png'

import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export default class Welcome extends Component {
    
    render() {
        return (
          <div className="background-div-navy">
            <div>
              <div className="header-div">
                <div>
                  <img className="logo-small image-align-left" src={logoBig} alt="Logo"/>
                </div>
              </div>
            </div>

            <div>
              <div className="centered-big-logo-div">
                <img className="logo-with-text-large" src={logoWithTextBig} alt="Logo"/>
              </div>
              <div className="login-title-text text-color-offwhite">
                Build a playlist <span class="text-color-teal">inspired</span> by your <span class="text-color-pink">desires</span>.
              </div>
              <div className="medium-padding-div">
                <a href='http://localhost:8888/login'>
                  <button className="button-big button-teal">Login with Spotify.</button>
                </a>
              </div>
              <div className="medium-padding-div">
                <a href='/learn-more' className="text-link-bold text-teal">
                  Learn More.
                </a>
              </div> 
            </div>
             
          </div>

        )
    }
}
 
