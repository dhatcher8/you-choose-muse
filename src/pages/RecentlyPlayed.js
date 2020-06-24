import React, { Component } from 'react'

import RecentlyPlayedComponent from "../components/RecentlyPlayed/RecentlyPlayedComponent";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default class RecentlyPlayed extends Component {
    render() {
        return (
            <div>
                <Header/>
                <RecentlyPlayedComponent/>
                <div className="outer-footer-div">
                    <Footer/>
                </div>
            </div>
        )
    }
}
