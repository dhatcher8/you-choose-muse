import React, { Component } from 'react'

import TopTracksComponent from "../components/TopTracks/TopTracksComponent";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default class TopTracks extends Component {
    render() {
        return (
            <div>
                <Header/>
                <TopTracksComponent/>
                <div className="outer-footer-div">
                    <Footer/>
                </div>
            </div>
        )
    }
}
