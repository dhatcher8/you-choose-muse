import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import './PlaylistHeader.css';

import {globalPlaylist} from '../PlaylistGenerator/PlaylistGenerator';
import {globalPlaylistName} from '../../pages/Home';


export default class PlaylistHeader extends Component {
    
    constructor() {
        super();
        this.state = {
            playlistEmpty: false,
            buttonIsActive: false,
            buttonText: "Save",
        }
        if (globalPlaylist.length == 0) {
            this.setState({
                playlistEmpty : true
            })
        }
        
    }

    onClick() {
        this.setState({ buttonIsActive: true });
        this.setState({ buttonText : "Playlist Saved!"});
    }
    
    render() {
        return (
            <div className="playlist-background">
                <div className="playlist-header-container">
                    <h3 className="playlist-title-text">{globalPlaylistName}</h3>
                    <Button className="btn-primary" className="playlist-button-position" className="playlist-button" className={
                        this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                        >
                    {this.state.buttonText}
                    </Button>  
                </div>
                
            </div>
        )
    }
}
