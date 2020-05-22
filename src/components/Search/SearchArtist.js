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
        // console.log(spotifyWebApi);
    }
    
    getAlbums(queryString) {
        //query spotify api for artists
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


        // console.log(artistInfo);
        
    }

    renderMaxArtistsReached() {
        if (this.state.artistsFull) {
            return (
                <div className="warning-text">
                    You can only submit up to 5 artists.
                </div>
            );
        }
        return;
    }

    renderSearchResults() {
        if (this.state.queriedArtists.length == 0 || this.state.queriedArtists.artists.items.length == 0) {
            return;
        }

        // console.log(this.state.queriedArtists)
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
                <div className="results-container">
                    {artists.map((result) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                className="result-items"
                                onClick={this.artistSelected.bind(this,result)}
                            >
                                <h6 className="image-username">{result.name}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.images[0].url} alt={result.user}/> 
                                </div> 
                            </a>
    					);
                    })}
                </div>
            );
        }
    }

    render() {
        var listOfArtists = null;
        if (globalArtistsList.length != 0) {
            listOfArtists = globalArtistsList.map(function(artist, idx){
                return (<li key={idx}>{artist.name}</li>)
                });
        }

        return (
            <div>
                <div>
                Artists: &nbsp;
                <input type="text" 
                    placeholder="Artist Name..."
                    value={this.state.search}
                    onChange={this.updateAndSearch.bind(this)}
                    />
                </div>
                <div>
                    Selected Artists: &nbsp;
                    {listOfArtists}
                    { this.renderMaxArtistsReached() }
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
