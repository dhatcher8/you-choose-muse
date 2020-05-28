import React, { Component } from 'react'

import RecentlyPlayedComponent from "../components/RecentlyPlayed/RecentlyPlayedComponent";
import Header from "../components/Header/Header";

export default class RecentlyPlayed extends Component {
    render() {
        return (
            <div>
                <Header/>
                <RecentlyPlayedComponent/>
            </div>
        )
    }
}
