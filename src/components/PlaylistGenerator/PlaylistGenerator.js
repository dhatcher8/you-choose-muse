import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import {globalPlaylistName, spotifyWebApi} from '../../pages/Home';
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
          generatedPlaylist : {},
          playlistGenerationFailure : false,
        }
    }

    onClick() {
        this.setState({buttonIsActive: true});
        this.getAllParameters();
        // this.checkForAllParameters();
        // this.generateNewPlaylist();
    }

    getAllParameters() {

        /* Create List of Artists */
        var tempArtists = [];
        var i;
        // console.log(globalArtistsList);
        for (i = 0; i < globalArtistsList.length; i++) {
            tempArtists.push(globalArtistsList[i].id);
        }
        // this.setState({ artists : tempArtists });
        // console.log(tempArtists);

        /* Create List of Tracks*/
        var tempTracks = [];
        var j;
        // console.log(globalTracksList);
        for (j = 0; j < globalTracksList.length; j++) {
            tempTracks.push(globalTracksList[j].id);
        }
        // this.setState({ tracks : tempTracks });
        // console.log(tempTracks);

        /* Create List of Genres*/
        var tempGenres = [];
        var k;
        // console.log(globalGenresList);
        for (k = 0; k < globalGenresList.length; k++) {
            tempGenres.push(globalGenresList[k].value);
        }
        // this.setState({ genres : tempGenres });
        // console.log(tempGenres);
        
        /* Set all parameters in state at once and wait before performing next function */
        this.setState({
            playlistName: globalPlaylistName,
            playlistLength: globalPlaylistLength,
            artists : tempArtists,
            tracks : tempTracks,
            genres : tempGenres
            },
            this.checkForAllParameters
        );

        // console.log(globalPlaylistName);
        // console.log(globalPlaylistLength);
        // console.log(globalArtistsList)
        // console.log(globalTracksList);
        // console.log(globalGenresList);
    }

    checkForAllParameters() {
        if (this.state.playlistName == "") {
            this.setState({playlistNameEmpty: true});
            return;
        } else {
            this.setState({playlistNameEmpty: false});
        }
        if (this.state.playlistLength == 0) {
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

        var totalSeeds = this.state.genres.length + this.state.artists.length + this.state.tracks.length;

        if (totalSeeds > 5) {
            this.setState({tooManySeeds: true});
            return;
        } else {
            this.setState({tooManySeeds: false});
        }

        /* Call generate from a callback to make sure all values in state updated */
        this.setState(this.generateNewPlaylist);

    }

    generateNewPlaylist() {
        // console.log(this.state.artists);

        spotifyWebApi.getRecommendations({
            limit : this.state.playlistLength,
            seed_artists : this.state.artists,
            seed_genres : this.state.genres,
            seed_tracks : this.state.tracks
        }).then(
            function(data) {
                this.setState({ generatedPlaylist : data}, this.goToPlaylistPage);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
        
    }

    goToPlaylistPage() {
        console.log(this.state.generatedPlaylist); 
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

    renderTooManySeeds() {
        if (this.state.tooManySeeds) {
            return (
                <div className="warning-text">
                    Make sure you have no more than 5 total artists, tracks, and genres selected!
                </div>
            );
        }
        return;
    }

    renderPlaylistGeneratorFailed() {
        if (this.state.playlistGenerationFailure) {
            return (
                <div className="warning-text">
                    The Generation Failed, you may have to login again to get refresh your authentication token!
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
                    { this.renderTooManySeeds() }
                    { this.renderPlaylistGeneratorFailed() }
                </div>
            </div>
        )
    }
}
