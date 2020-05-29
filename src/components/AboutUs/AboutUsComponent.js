import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import logoWithTextBig from '../../images/logo-with-text-big.png'

export default class AboutUsComponent extends Component {
    
    constructor() {
        super();
        this.state = {
          redirect: null,
        }
    }

    goToBuildPlaylist() {
        this.setState({ redirect: "../home"});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
          <div className="background-div-offwhite">
            <div className="rounded-container-navy">
                <div>
                    <a href='#' onClick={() => this.goToBuildPlaylist()}>
                        <img className="logo-with-text-information-page margins-in-rounded-div" src={logoWithTextBig} alt="Logo"/>
                    </a>
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    You Choose, Muse is a web-app that allows you to build playlists recommendations from your choice of artists, songs, and genres in just three simple steps:
                </div>
                <div className="basic-title-text margins-in-rounded-div-titles text-color-offwhite">
                    1. Find Your Muse
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    Discover your most recently played songs, as well as your your top streamed songs and artists to choose the best inspiration for your playlist! 
                </div>
                <div className="basic-title-text margins-in-rounded-div-titles text-color-teal">
                    2. Build Your Playlist
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    Choose up to five artists, songs, and genres for your new playlist to be based off of. Give it a name and a number of tracks, and let us do the work!
                </div>
                <div className="basic-title-text margins-in-rounded-div-titles text-color-pink">
                    3. Save Your Masterpiece
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    Once your optimal playlist has been created, you can immediately save it to your spotify account and listen to it within seconds!
                </div>
                <div className="basic-title-text margins-in-rounded-div-titles text-color-offwhite">
                    Why Login To Spotify?
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    You Choose, Muse requires your Spotify login in order to show you your play history, cater recommendations to you, and save playlists to your profile. But no need to worry, your data is never permanently stored through our app!
                </div>
                <div className="basic-title-text margins-in-rounded-div-titles text-color-offwhite">
                    Logged Into the Wrong Account?
                </div>
                <div className="basic-body-text-offwhite margins-in-rounded-div">
                    Just go to <a href="https://accounts.spotify.com/" className="text-teal">accounts.spotify.com</a> and log out. Then go back to You Choose, Muse's main page and login again! 
                </div>
                <div className="button-margins-in-rounded-div">
                    <a href='#' onClick={() => this.goToBuildPlaylist()}>
                        <button className="button-big button-teal">Sounds Great!</button>
                    </a>
                </div>
            </div>
          </div>
        )
    }
}
 