import React, { Component } from 'react'

import './PlaylistHeader.css';

import {spotifyWebApi} from '../../pages/GetTokenRedirect';
import {globalPlaylist} from '../PlaylistGenerator/PlaylistGenerator';
import {globalPlaylistName} from '../../pages/Home';
import {globalPlaylistLength} from '../PlaylistLength/PlaylistLength';


export default class PlaylistHeader extends Component {
    
    constructor() {
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
    }

    onClick() {
        this.setState({ buttonIsActive: true });
        this.setState({ buttonText : "Playlist Saved!"}, this.getUserID);
    }

    getUserID() {
        spotifyWebApi.getMe().then(
            function(data) {
                this.setState({ userID : data.id}, this.createPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );
    }

    createPlaylist() {
        spotifyWebApi.createPlaylist(this.state.userID, {
            "name": globalPlaylistName,
            "description": "Recommendation Playlist Made By You Choose, Muse",
            "public": true
        }).then(
            function(data) {
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );
    }

    addSongsToPlaylist() {
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

        spotifyWebApi.addTracksToPlaylist(this.state.userID, this.state.newPlaylistData.id, trackURIs1).then(
            function(data) {
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );

        spotifyWebApi.addTracksToPlaylist(this.state.userID, this.state.newPlaylistData.id, trackURIs2).then(
            function(data) {
                this.setState({ newPlaylistData : data}, this.addSongsToPlaylist);
            }.bind(this),
            function (err) {
                console.error(err);
            }.bind(this)
        );

    }
    
    render() {
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
                </div>
                
            </div>
        )
    }
}
