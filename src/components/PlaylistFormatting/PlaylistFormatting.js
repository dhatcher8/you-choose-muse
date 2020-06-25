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
        
    }
    
    render() {
        if (globalPlaylist.length == 0) {
            return (
                <div className="warning-logout-container">
                    <div className="warning-sub-container">
                        Uh oh, you've been logged out! Go back to the home screen and login!
                    </div>
                </div>
            );
        }
        var i;
        for (i = 0; i < globalPlaylist.length; i++) {
            try {
                globalPlaylist[i].album.images[0].url = globalPlaylist[i].album.images[0].url;
            }
            catch {
                if (globalPlaylist[i].name == "") {
                    globalPlaylist.splice(i, 1);
                } else {
                    if (globalPlaylist[i].album.images.length < 1 || globalPlaylist[i].album.images == undefined) {
                        globalPlaylist[i].album.images[0] = { url: ''};
                    } else {
                        globalPlaylist[i].album.images[0].url = { url: ''};
                    }  
                }
            }
        }
        return (
            <div className="playlist-items-background-div">
                <div className="playlist-list-container-div">
                    {globalPlaylist.map((result, index) => {
                        return (
                            <a 
                                key={result.id} 
                                href={null} 
                                className="playlist-individual-items"
                            >
                                <h6 className="playlist-item-number">{index+1}</h6>
                                <img className="playlist-item-image" src={result.album.images[0].url} alt={result.album.name}/> 
                                <div className="playlist-item-text">
                                    <div className="playlist-item-text-one">{result.name}</div>
                                    <div className="playlist-item-text-two">{result.artists[0].name}</div>
                                </div>
                                
                            </a>
    					);
                    })}
                </div>
            </div>
        )
    }
}
