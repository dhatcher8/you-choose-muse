import React, { Component } from 'react'

import TopTracksComponent from "../components/TopTracks/TopTracksComponent";
import Header from "../components/Header/Header";

export default class TopTracks extends Component {
    render() {
        return (
            <div>
                <Header/>
                <TopTracksComponent/>
            </div>
        )
    }
}
