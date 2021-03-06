import React, { Component } from 'react'

import {spotifyWebApi} from '../../pages/GetTokenRedirect'

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
        this.getTracks(event.target.value);
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }
    
    getTracks(queryString) {
        if (prev !== null) {
            prev.abort();
        }
        if (queryString == '') {
            this.setState({queriedTracks: []});
            return;
        }
        prev = spotifyWebApi.searchTracks(queryString, { limit: 8 });
        prev.then(
            function (data) {
                prev = null;
                this.setState({queriedTracks: data});
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
        }
        else {
            this.setState({tracksFull: true});
        }
        this.setState({ search : "" });
        this.getTracks('')
        
    }

    renderMaxTracksReached() {
        if (this.state.tracksFull) {
            return (
                <div className="warning-small-container">
                    You can only submit up to 5 tracks.
                </div>
            );
        }
        return;
    }

    removeSelectedTrack(index) {
        globalTracksList.splice(index, 1);
        this.setState({tracksFull: false},
            this.render);
    }

    renderSearchResults() {
        if (this.state.queriedTracks.length == 0 || this.state.queriedTracks.tracks.items.length == 0) {
            return;
        }

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
                <div className="search-results-container">
                    {tracks.map((result) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} 
                                className="search-result-items"
                                onClick={this.trackSelected.bind(this,result)}
                            >
                                <div className="search-image-wrapper">
                                    <img className="search-image" src={result.album.images[0].url} alt={result.user}/> 
                                </div> 
                                <h6 className="search-image-username">{result.name + " by " + result.artists[0].name}</h6>
                            </a>
    					);
                    })}
                </div>
            );
        }
    }

    renderSelectedTracks() {
        var listOfTracks = null;
        var outer_this = this;
        if (globalTracksList.length != 0) {
            listOfTracks = globalTracksList.map(function(track, idx){
                return (
                <button className="selected-li-item" onClick={() => outer_this.removeSelectedTrack(idx)} key={idx}>{track.name} &nbsp; <span class="text-color-pink text-bold text-twentytwo">X</span></button>
                )
                });
        }
        if (globalTracksList.length != 0) {
            return (
                <div className="selected-builder-element-div">
                    <div className="builder-elements-right-align">
                        <div className="sub-title-text-home"> Selected Tracks: &nbsp;</div>
                    </div>
                    <div className="builder-elements-left-align">
                        <div className="selected-elements-div">
                            {listOfTracks}
                        </div>
                    </div>   
                </div>
            );
        }
    }

    render() {

        return (
            <div>
                <div className="general-builder-element-div">
                    <div className="builder-elements-right-align">
                        <h3 className="sub-title-text-home"> Tracks: &nbsp;</h3>
                    </div>
                    <div className="builder-elements-left-align">
                        <input type="text" 
                            placeholder="Track Name..."
                            className="text-input"
                            value={this.state.search}
                            onChange={this.updateAndSearch.bind(this)}
                        />
                    </div>
                </div>


                { this.renderSelectedTracks() }

                <div style={{clear:'both'}}></div>
                { this.renderMaxTracksReached() }


                <div>
                    <div className="container">

                        { this.renderSearchResults() }
                    </div>
                </div>
            </div>
        )
    }
}
