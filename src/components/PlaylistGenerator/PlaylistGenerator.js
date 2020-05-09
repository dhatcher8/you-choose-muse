import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import {globalPlaylistName} from '../../pages/Home';
import {globalPlaylistLength} from '../PlaylistLength/PlaylistLength';
import {globalArtistsList} from '../Search/SearchArtist';
import {globalTracksList} from '../Search/SearchTrack';
import {globalGenresList} from '../GenreSelect/GenreSelect';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaylistGenerator.css'

export default class PlaylistGenerator extends Component {    
    
    constructor() {
        super();
        this.state = {
          buttonIsActive: false,
          playlistName: "",
          playlistLength: -1,
          artists: [],
          tracks: [],
          genres: [],
          playlistNameEmpty: false,
          playlistLengthChosen: true,
          allParamsEmpty: false,
          tooManyGenres: false,
        }
    }

    onClick() {
        this.setState({buttonIsActive: true});
        this.getAllParameters();
        this.checkForAllParameters();
    }

    getAllParameters() {
        console.log(globalPlaylistName);
        console.log(globalPlaylistLength);
        console.log(globalArtistsList)
        console.log(globalTracksList);
        console.log(globalGenresList);
    }

    checkForAllParameters() {
        if (this.state.playlistName == "") {
            this.setState({playlistNameEmpty: true});
            return;
        } else {
            this.setState({playlistNameEmpty: false});
        }
        if (this.state.playlistLength == -1) {
            this.setState({playlistLengthChosen: false});
            return;
        } else {
            this.setState({playlistLengthChosen: true});
        }
        if (this.state.artists.length == 0 && this.state.tracks.length == 0 && this.state.genres.length == 0) {
            this.setState({allParamsEmpty: true});
            return;
        } else {
            this.setState({allParamsEmpty: false});
        }
        if (this.state.genres.length > 5) {
            this.setState({tooManyGenres: true});
            return;
        } else {
            this.setState({tooManyGenres: false});
        }
    }

    renderPlaylistNameRequired() {
        if (this.state.playlistNameEmpty) {
            return (
                <div className="warning-text">
                    You must name your playlist first!
                </div>
            );
        }
        return;
    }

    renderPlaylistLengthRequired() {
        if (!this.state.playlistLengthChosen) {
            return (
                <div className="warning-text">
                    You must choose a playlist length!
                </div>
            );
        }
        return;
    }

    renderSomeParametersRequired() {
        if (this.state.allParamsEmpty) {
            return (
                <div className="warning-text">
                    You must choose at least one artist, track, or genre!
                </div>
            );
        }
        return;
    }

    renderTooManyGenres() {
        if (this.state.tooManyGenres) {
            return (
                <div className="warning-text">
                    You've selected too many genres!
                </div>
            );
        }
        return;
    }

    render() {
        return (
            <div>
                <Button className="btn-primary" className="playlist-button" className={
                        this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                        >
                    Generate
                </Button>  
                <div>
                    { this.renderPlaylistNameRequired() }
                    { this.renderPlaylistLengthRequired() }
                    { this.renderSomeParametersRequired() }
                    { this.renderTooManyGenres() }
                </div>
            </div>
        )
    }
}
