import React, { Component } from 'react'

import AboutUsComponent from "../components/AboutUs/AboutUsComponent";
import Header from "../components/Header/Header";

export default class AboutUs extends Component {
    render() {
        return (
            <div>
                <Header/>
                <AboutUsComponent/>
            </div>
        )
    }
}
