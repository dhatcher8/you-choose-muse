import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

import {globalPlaylistName, spotifyWebApi} from '../../pages/Home';
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

        // if (totalSeeds > 5) {
        //     this.setState({tooManySeeds: true});
        //     return;
        // } else {
        //     this.setState({tooManySeeds: false});
        // }
        this.setState({totalparams : totalSeeds}, this.getMasterPlaylist);

        /* Call generate from a callback to make sure all values in state updated */
        // this.setState(this.getMasterPlaylist);

    }

    getMasterPlaylist() {
        var atg = this.getSizesOfSubPlaylists();
        console.log(atg);
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
        console.log(this.state);
        this.waitForPlaylistUpdates();


        // var ap = this.state.ap;
        // var tp = this.state.tp;
        // var gp = this.state.gp;
        // console.log(this.state.ap);
        // // var ap = this.getArtistPlaylist(a);
        // // var tp = this.getTrackPlaylist(t);
        // // var gp = this.getGenrePlaylist(g);
        // var masterPlaylist = ap.concat(tp).concat(gp);
        // console.log(masterPlaylist);
        // var i,j,x;
        // for (i = masterPlaylist.length - 1; i > 0; i--) {
        //     j = Math.floor(Math.random() * (i + 1));
        //     x = masterPlaylist[i];
        //     masterPlaylist[i] = masterPlaylist[j];
        //     masterPlaylist[j] = x;
        // }
        // console.log(masterPlaylist);
        // this.setState({ generatedPlaylist : masterPlaylist}, this.goToPlaylistPage);

    }

    waitForPlaylistUpdates() {
        
        if (this.state.ap != "stop" && this.state.tp != "stop" && this.state.gp != "stop") {
            console.log(this.state.ap, this.state.tp, this.state.gp);
            this.shuffleMasterPlaylist();
        } else {
            setTimeout(this.waitForPlaylistUpdates.bind(this), 200);
        }
    }

    shuffleMasterPlaylist() {
        var ap = this.state.ap;
        var tp = this.state.tp;
        var gp = this.state.gp;
        console.log(this.state.ap.tracks);
        var masterPlaylist = [];
        if (ap.length != 0) {
            masterPlaylist = ap.tracks;
            if (tp.length != 0) {
                masterPlaylist = masterPlaylist.concat(tp.tracks);
                console.log(tp.tracks);
                console.log(masterPlaylist);
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
        // var masterPlaylist = ap.concat(tp).concat(gp);
        console.log(masterPlaylist);
        var i,j,x;
        for (i = masterPlaylist.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = masterPlaylist[i];
            masterPlaylist[i] = masterPlaylist[j];
            masterPlaylist[j] = x;
        }
        console.log(masterPlaylist);
        this.setState({ generatedPlaylist : masterPlaylist}, this.goToPlaylistPage);

    }

    getSizesOfSubPlaylists() {
        // console.log((this.state.genres.length));
        // console.log((this.state.totalparams));
        // console.log((this.state.genres.length / this.state.totalparams));
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
            // console.log(g,t,a);
        }
        var atg = [a,t,g];
        return atg;
    }

    getArtistPlaylist(size) {
        // var newArtistPlaylist = [];
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_artists : this.state.artists
        }).then(
            function(data) {
                // this.newArtistPlaylist = data;
                this.setState({ ap : data});
                console.log(data);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
        // console.log(newArtistPlaylist);
        // return newArtistPlaylist;
    }

    getTrackPlaylist(size) {
        // var newTrackPlaylist = [];
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_tracks : this.state.tracks
        }).then(
            function(data) {
                // newTrackPlaylist = data;
                this.setState({ tp : data})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
        // console.log(newTrackPlaylist);
        // return newTrackPlaylist;
    }

    getGenrePlaylist(size) {
        // var newGenrePlaylist = [];
        spotifyWebApi.getRecommendations({
            limit : size,
            seed_genres : this.state.genres
        }).then(
            function(data) {
                // newGenrePlaylist = data;
                this.setState({ gp : data})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
        // console.log(newGenrePlaylist);
        // return newGenrePlaylist;
    }

    // generateNewPlaylist() {
    //     // console.log(this.state.artists);

    //     spotifyWebApi.getRecommendations({
    //         limit : this.state.playlistLength,
    //         seed_artists : this.state.artists,
    //         seed_genres : this.state.genres,
    //         seed_tracks : this.state.tracks
    //     }).then(
    //         function(data) {
    //             this.setState({ generatedPlaylist : data}, this.goToPlaylistPage);
    //         }.bind(this),
    //         function (err) {
    //             console.error(err);
    //             this.setState({ playlistGenerationFailure : true });
    //         }.bind(this)
    //     );
        
    // }

    goToPlaylistPage() {
        console.log(this.state.generatedPlaylist); 
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

    // renderTooManySeeds() {
    //     if (this.state.tooManySeeds) {
    //         return (
    //             <div className="warning-text">
    //                 Make sure you have no more than 5 total artists, tracks, and genres selected!
    //             </div>
    //         );
    //     }
    //     return;
    // }

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
                <Button className="btn-primary" className="playlist-button" className={
                        this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                        >
                    Generate
                </Button>  
                <div>
                    { this.renderPlaylistNameRequired() }
                    { this.renderPlaylistLengthRequired() }
                    { this.renderSomeParametersRequired() }
                    {/* { this.renderTooManySeeds() } */}
                    { this.renderPlaylistGeneratorFailed() }
                </div>
            </div>
        )
    }
}
