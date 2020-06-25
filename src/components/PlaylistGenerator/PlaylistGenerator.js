import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import {globalPlaylistName} from '../../pages/Home';
import {spotifyWebApi} from '../../pages/GetTokenRedirect';
import {globalPlaylistLength} from '../PlaylistLength/PlaylistLength';
import {globalArtistsList} from '../Search/SearchArtist';
import {globalTracksList} from '../Search/SearchTrack';
import {globalGenresList} from '../GenreSelect/GenreSelect';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaylistGenerator.css'

export var globalPlaylist = [];

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
          redirect : null,
          totalparams : 0,
          ap: "stop",
          tp: "stop",
          gp: "stop",
        }
    }

    onClick() {
        this.setState({buttonIsActive: true});
        this.getAllParameters();
    }

    getAllParameters() {

        /* Create List of Artists */
        var tempArtists = [];
        var i;
        for (i = 0; i < globalArtistsList.length; i++) {
            tempArtists.push(globalArtistsList[i].id);
        }

        /* Create List of Tracks*/
        var tempTracks = [];
        var j;
        for (j = 0; j < globalTracksList.length; j++) {
            tempTracks.push(globalTracksList[j].id);
        }

        /* Create List of Genres*/
        var tempGenres = [];
        var k;
        for (k = 0; k < globalGenresList.length; k++) {
            tempGenres.push(globalGenresList[k].value);
        }
        
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

        this.setState({totalparams : totalSeeds}, this.getMasterPlaylist);

        /* Call generate from a callback to make sure all values in state updated */

    }

    getMasterPlaylist() {
        var atg = this.getSizesOfSubPlaylists();
        var a = atg[0];
        var t = atg[1];
        var g = atg[2];
        if (a != 0) {
            this.setState(this.getArtistPlaylist(a));
        } else {
            this.setState({ap: []});
        }
        if (t != 0) {
            this.setState(this.getTrackPlaylist(t));
        } else {
            this.setState({tp: []});
        }
        if (g != 0) {
            this.setState(this.getGenrePlaylist(g));
        } else {
            this.setState({gp:[]});
        }
        this.waitForPlaylistUpdates();

    }

    waitForPlaylistUpdates() {
        
        if (this.state.ap != "stop" && this.state.tp != "stop" && this.state.gp != "stop") {
            this.shuffleMasterPlaylist();
        } else {
            setTimeout(this.waitForPlaylistUpdates.bind(this), 200);
        }
    }

    shuffleMasterPlaylist() {
        var ap = this.state.ap;
        var tp = this.state.tp;
        var gp = this.state.gp;
        var masterPlaylist = [];
        if (ap.length != 0) {
            masterPlaylist = ap.tracks;
            if (tp.length != 0) {
                masterPlaylist = masterPlaylist.concat(tp.tracks);
            }
            if (gp.length != 0) {
                masterPlaylist = masterPlaylist.concat(gp.tracks);
            }
        } else if (tp.length != 0) {
            masterPlaylist = tp.tracks;
            if (gp.length != 0) {
                masterPlaylist = masterPlaylist.concat(gp.tracks);
            }
        } else {
            masterPlaylist = gp.tracks;
        }
        var i,j,x;
        for (i = masterPlaylist.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = masterPlaylist[i];
            masterPlaylist[i] = masterPlaylist[j];
            masterPlaylist[j] = x;
        }
        this.setState({ generatedPlaylist : masterPlaylist}, this.goToPlaylistPage);

    }

    getSizesOfSubPlaylists() {

        var a,t,g;
        if (this.state.artists.length == 0) {
            a = 0;
            if (this.state.tracks.length == 0) {
                t = 0;
                g = this.state.playlistLength;
            }
            else if (this.state.genres.length == 0) {
                g = 0;
                t = this.state.playlistLength;
            }
            else {
                t = Math.floor((this.state.tracks.length / this.state.totalparams) * this.state.playlistLength);
                g = this.state.playlistLength - t;
            }
        } 
        else if (this.state.tracks.length == 0) {
            t = 0;
            if (this.state.genres.length == 0) {
                g = 0;
                a = this.state.playlistLength;
            }
            else {
                a = Math.floor((this.state.artists.length / this.state.totalparams) * this.state.playlistLength);
                g = this.state.playlistLength - a;
            }
        }
        else if (this.state.genres.length == 0) {
            g = 0;
            a = Math.floor((this.state.artists.length / this.state.totalparams) * this.state.playlistLength);
            t = this.state.playlistLength - a;
        }
        else {
            g = Math.floor((this.state.genres.length / this.state.totalparams) * this.state.playlistLength);
            t = Math.floor((this.state.tracks.length / this.state.totalparams) * this.state.playlistLength);
            a = this.state.playlistLength - (g + t);
        }
        var atg = [a,t,g];
        return atg;
    }

    getArtistPlaylist(size) {
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_artists : this.state.artists
        }).then(
            function(data) {
                this.setState({ ap : data});
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getTrackPlaylist(size) {
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_tracks : this.state.tracks
        }).then(
            function(data) {
                this.setState({ tp : data})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getGenrePlaylist(size) {
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_genres : this.state.genres
        }).then(
            function(data) {
                this.setState({ gp : data})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    goToPlaylistPage() {
        globalPlaylist = this.state.generatedPlaylist;
        this.setState({ redirect: "../playlist" });
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div className="generate-builder-button-div">
                    <button className="playlist-button-save button-pink" onClick={() => this.onClick()}>
                        Generate!
                    </button>  
                </div>

                <div>
                    { this.renderPlaylistNameRequired() }
                    { this.renderPlaylistLengthRequired() }
                    { this.renderSomeParametersRequired() }
                    { this.renderPlaylistGeneratorFailed() }
                </div>
            </div>
        )
    }
}
