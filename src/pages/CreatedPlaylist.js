import React, { Component } from 'react'

import PlaylistFormatting from "../components/PlaylistFormatting/PlaylistFormatting";
import PlaylistHeader from "../components/PlaylistHeader/PlaylistHeader";

export default class CreatedPlaylist extends Component {
    render() {
        return (
            <div>
                <PlaylistHeader/>
                <PlaylistFormatting/>
            </div>
            
        )
    }
}
