import React, { Component } from 'react'

import TopArtistsComponent from "../components/TopArtists/TopArtistsComponent";
import Header from "../components/Header/Header";

export default class TopArtists extends Component {
    render() {
        return (
            <div>
                <Header/>
                <TopArtistsComponent/>
            </div>
        )
    }
}
