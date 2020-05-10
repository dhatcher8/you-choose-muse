import React, { Component } from 'react'

import {globalPlaylist} from '../PlaylistGenerator/PlaylistGenerator';

import './PlaylistFormatting.css'

export default class PlaylistFormatting extends Component {
    
    constructor() {
        super();
        this.state = {
            playlistEmpty: false,
        }
        if (globalPlaylist.length == 0) {
            this.setState({
                playlistEmpty : true
            })
        }
        // console.log(globalPlaylist);
        
    }
    
    render() {
        if (this.state.playlistEmpty) {
            return (
                <div className="warning-container">
                    An error has occured, the playlist disappeared.
                </div>
            );
        }
        var i;
        for (i = 0; i < globalPlaylist.tracks.length; i++) {
            try {
                globalPlaylist.tracks[i].album.images[0].url = globalPlaylist.tracks[i].album.images[0].url;
            }
            catch {
                globalPlaylist.tracks[i].album.images[0].url = { url: ''};
            }
        }
        return (
            <div className="playlist-background">
                <div className="playlist-container">
                    {globalPlaylist.tracks.map((result, index) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                className="playlist-items"
                                // onClick={this.artistSelected.bind(this,result)}
                            >
                                <h6 className="track-number">{index+1}</h6>
                                {/* </a><div className="image-wrapper"> */}
                                <img className="album-cover" src={result.album.images[0].url} alt={result.album.name}/> 
                                {/* </div>  */}
                                <div className="track-and-artist">
                                    <h6 className="track-name">{result.name}</h6>
                                    <h6 className="artist-name">{result.artists[0].name}</h6>
                                </div>
                                
                            </a>
    					);
                    })}
                </div>
            </div>
        )
    }
}
