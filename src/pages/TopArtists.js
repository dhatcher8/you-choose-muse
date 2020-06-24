import React, { Component } from 'react'

import TopArtistsComponent from "../components/TopArtists/TopArtistsComponent";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default class TopArtists extends Component {
    render() {
        return (
            <div>
                <Header/>
                <TopArtistsComponent/>
                <div className="outer-footer-div">
                    <Footer/>
                </div>
            </div>
        )
    }
}
