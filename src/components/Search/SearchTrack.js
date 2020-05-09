import React, { Component } from 'react'

import {spotifyWebApi} from '../../pages/Home'
import './Search.css';

var prev = null;
export var globalTracksList = [];

export default class SearchTrack extends Component {
    
    constructor() {
        super();
        this.state = {
            search: '',
            queriedTracks: [],
            tracksFull: false
        }
    }

    updateAndSearch(event) {
        this.updateSearch(event);
        this.getTracks(event);
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
        // console.log(spotifyWebApi);
    }
    
    getTracks(event) {
        //query spotify api for tracks
        if (prev !== null) {
            prev.abort();
        }
        if (event.target.value == '') {
            this.setState({queriedTracks: []});
            return;
        }
        prev = spotifyWebApi.searchTracks(event.target.value, { limit: 8 }); // THIS LINE NEEDS FIXING
        prev.then(
            function (data) {
                prev = null;
                this.setState({queriedTracks: data});
                // console.log(data)
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    trackSelected(trackInfo) {
        if (globalTracksList.length < 5){
            this.setState({tracksFull: false});
            globalTracksList.push(trackInfo);
            this.render();
            return;
        }
        else {
            this.setState({tracksFull: true});
        }


        // console.log(trackInfo);
        
    }

    renderMaxTracksReached() {
        if (this.state.tracksFull) {
            return (
                <div className="warning-text">
                    You can only submit up to 5 tracks.
                </div>
            );
        }
        return;
    }

    renderSearchResults() { // THIS WHOLE FUNCTION NEEDS FIXING
        if (this.state.queriedTracks.length == 0 || this.state.queriedTracks.tracks.items.length == 0) {
            return;
        }

        // console.log(this.state.queriedTracks)
        const tracks = this.state.queriedTracks.tracks.items;
        if (tracks.length) {
            var i;
            for (i = 0; i < tracks.length; i++) {
                try {
                    tracks[i].album.images[0].url = tracks[i].album.images[0].url;
                }
                catch {
                    tracks[i].album.images[0].url = { url: ''};
                }
            }
            return (
                <div className="results-container">
                    {tracks.map((result) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} //later this href can add track also can later fill in the alt under image source as a common image or something
                                className="result-items"
                                onClick={this.trackSelected.bind(this,result)}
                            >
                                <h6 className="image-username">{result.name + " by " + result.artists[0].name}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.album.images[0].url} alt={result.user}/> 
                                </div> 
                            </a>
    					);
                    })}
                </div>
            );
        }
    }

    render() {
        var listOfTracks = null;
        if (globalTracksList.length != 0) {
            listOfTracks = globalTracksList.map(function(track, idx){
                return (<li key={idx}>{track.name}</li>)
                });
        }

        return (
            <div>
                <div>
                Tracks: &nbsp;
                <input type="text" 
                    placeholder="Track Name..."
                    value={this.state.search}
                    onChange={this.updateAndSearch.bind(this)}
                    />
                </div>
                <div>
                    Selected Tracks: &nbsp;
                    {listOfTracks}
                    { this.renderMaxTracksReached() }
                </div>
                <div>
                    <div className="container">
                        {/*Result*/}
                        { this.renderSearchResults() }
                    </div>
                </div>
            </div>
        )
    }
}
