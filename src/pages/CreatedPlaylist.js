import React, { Component } from 'react'

import PlaylistFormatting from "../components/PlaylistFormatting/PlaylistFormatting";
import PlaylistHeader from "../components/PlaylistHeader/PlaylistHeader";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default class CreatedPlaylist extends Component {
    render() {
        return (
            <div>
                <Header/>
                <PlaylistHeader/> 
                <PlaylistFormatting/>
                <div className="outer-footer-div">
                    <Footer/>
                </div>
            </div>
            
        )
    }
}
