import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import './PlaylistHeader.css';

import {spotifyWebApi} from '../../pages/GetTokenRedirect';
import {globalPlaylist} from '../PlaylistGenerator/PlaylistGenerator';
import {globalPlaylistName} from '../../pages/Home';
import {globalPlaylistLength} from '../PlaylistLength/PlaylistLength';


export default class PlaylistHeader extends Component {
    
    constructor() {
        // console.log(spotifyWebApi.getAccessToken());
        super();
        this.state = {
            playlistEmpty: false,
            buttonIsActive: false,
            buttonText: "Save.",
            userID: "",
        }
        if (globalPlaylist.length == 0) {
            this.setState({
                playlistEmpty : true
            })
        }
        console.log(globalPlaylist);
        
    }

    onClick() {
        this.setState({ buttonIsActive: true });
        this.setState({ buttonText : "Playlist Saved!"}, this.getUserID);
    }

    getUserID() {
        spotifyWebApi.getMe().then(
            function(data) {
                // console.log(data);
                this.setState({ userID : data.id}, this.createPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );
    }

    createPlaylist() {
        // console.log(this.state.userID)
        spotifyWebApi.createPlaylist(this.state.userID, {
            "name": globalPlaylistName,
            "description": "Recommendation Playlist Made By You Choose, Muse",
            "public": true
        }).then(
            function(data) {
                // console.log(data);
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );
    }

    addSongsToPlaylist() {
        // console.log(globalPlaylist);
        // console.log(this.state.newPlaylistData);
        var trackURIs1 = [];
        var trackURIs2 = [];
        var i;
        var j;
        for (i = 0; i < Math.floor(globalPlaylistLength / 2); i++) {
            trackURIs1.push(globalPlaylist[i].uri);
        }
        for (j = Math.floor(globalPlaylistLength / 2); j < globalPlaylist.length; j++) {
            trackURIs2.push(globalPlaylist[j].uri);
        }

        // console.log(trackURIs1, trackURIs2);

        spotifyWebApi.addTracksToPlaylist(this.state.userID, this.state.newPlaylistData.id, trackURIs1).then(
            function(data) {
                // console.log(data);
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );

        spotifyWebApi.addTracksToPlaylist(this.state.userID, this.state.newPlaylistData.id, trackURIs2).then(
            function(data) {
                // console.log(data);
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );

    }
    
    render() {
        // console.log(globalPlaylist);
        if (globalPlaylist.length == 0) {
            return null;
        }
        return (
            <div className="playlist-header-background-div-with-save">
                <div className="playlist-header-div">
                    <h3 className="title-text text-color-teal">{globalPlaylistName}</h3>
                    <button className="playlist-button-save button-pink" onClick={() => this.onClick()}>
                    {this.state.buttonText}
                    </button> 
                    {/* <button className="playlist-button-save button-pink" >Login with Spotify.</button> */}
                </div>
                
            </div>
        )
    }
}

// className={
//     this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'}