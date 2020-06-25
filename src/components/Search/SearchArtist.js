import React, { Component } from 'react'

import {spotifyWebApi} from '../../pages/GetTokenRedirect'
import './Search.css';

var prev = null;
export var globalArtistsList = [];

export default class SearchArtist extends Component {
    
    constructor() {
        super();
        this.state = {
            search: '',
            queriedArtists: [],
            artistsFull: false
        }
    }

    updateAndSearch(event) {
        this.updateSearch(event);
        this.getAlbums(event.target.value);
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }
    
    getAlbums(queryString) {
        if (prev !== null) {
            prev.abort();
        }
        if (queryString == '') {
            this.setState({queriedArtists: []});
            return;
        }
        prev = spotifyWebApi.searchArtists(queryString, { limit: 8 });
        prev.then(
            function (data) {
                prev = null;
                this.setState({queriedArtists: data});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    artistSelected(artistInfo) {
        if (globalArtistsList.length < 5){
            this.setState({artistsFull: false});
            globalArtistsList.push(artistInfo);
        }
        else {
            this.setState({artistsFull: true});
        }
        this.setState({ search : "" });
        this.getAlbums('')

        
    }

    renderMaxArtistsReached() {
        if (this.state.artistsFull) {
            return (
                <div className="warning-small-container">
                    You can only submit up to 5 artists.
                </div>
            );
        }
        return;
    }

    removeSelectedArtist(index) {
        globalArtistsList.splice(index, 1);
        this.setState({artistsFull: false},
            this.render);
    }

    renderSearchResults() {
        if (this.state.queriedArtists.length == 0 || this.state.queriedArtists.artists.items.length == 0) {
            return;
        }

        const artists = this.state.queriedArtists.artists.items;
        if (artists.length) {
            var i;
            for (i = 0; i < artists.length; i++) {
                try {
                    artists[i].images[0].url = artists[i].images[0].url;
                }
                catch {
                    artists[i].images[0] = { url: ''};
                }
            }
            return (
                <div className="search-results-container">
                    {artists.map((result) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} 
                                className="search-result-items"
                                onClick={this.artistSelected.bind(this,result)}
                            >
                                
                                <div className="search-image-wrapper">
                                    <img className="search-image" src={result.images[0].url} alt={result.user}/> 
                                </div> 
                                <div className="search-image-username">{result.name}</div>
                            </a>
    					);
                    })}
                </div>
            );
        }
    }

    renderSelectedArtists() {
        var listOfArtists = null;
        var outer_this = this;
        if (globalArtistsList.length != 0) {
            listOfArtists = globalArtistsList.map(function(artist, idx){
                return (
                <button className="selected-li-item" onClick={() => outer_this.removeSelectedArtist(idx)} key={idx}>{artist.name} &nbsp; <span class="text-color-pink text-bold text-twentytwo">X</span></button>
                )
                });
        }
        if (globalArtistsList.length != 0) {
            return (
                <div className="selected-builder-element-div">
                    <div className="builder-elements-right-align">
                        <div className="sub-title-text-home"> Selected Artists: &nbsp;</div>
                    </div>
                    <div className="builder-elements-left-align">
                        <div className="selected-elements-div">
                            {listOfArtists}
                        </div>
                    </div>
                </div>
            );
        } else {
            return;
        }
        
    }

    render() {

        return (
            <div>
                <div className="general-builder-element-div">
                    <div className="builder-elements-right-align">
                        <h3 className="sub-title-text-home"> Artists: &nbsp;</h3>
                    </div>
                    <div className="builder-elements-left-align">
                        <input type="text" 
                            placeholder="Artist Name..."
                            className="text-input"
                            value={this.state.search}
                            onChange={this.updateAndSearch.bind(this)}
                        />
                    </div>
                </div>

                { this.renderSelectedArtists() }
                <div style={{clear:'both'}}></div>
                { this.renderMaxArtistsReached() }
                { this.renderSearchResults() }
            </div>
        )
    }
}
