import React, { Component } from 'react'

import AboutUsComponent from "../components/AboutUs/AboutUsComponent";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default class AboutUs extends Component {
    render() {
        return (
            <div>
                <Header/>
                <AboutUsComponent/>
                <div className="outer-footer-div">
                    <Footer/>
                </div>
            </div>
        )
    }
}
