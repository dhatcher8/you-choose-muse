import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import logoBig from '../images/logo-big.png';
import logoWithTextBig from '../images/logo-with-text-big.png';
import Footer from "../components/Footer/Footer";

export default class Welcome extends Component {
    
    constructor(){
        super();
        this.state = {
          redirect : null,
        }
    }

    goBackToWelcome() {
        this.setState({ redirect: "../" });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } 
        return (
          <div className="width-error-container">
            <div className="width-error-sub-container">
                <a href='#' onClick={() => this.goBackToWelcome()}>
                    <img className="logo-with-text-medium" src={logoWithTextBig} alt="Logo"/>
                </a>
            </div>
            <div className="width-error-sub-container">
                Unfortunately, You Choose, Muse doesn't support this screen size at this time. Try expanding your window or coming back later with a device with a wider screen. We apologize for the inconvenience and thank you for your patience!
            </div>
            <div className="generate-builder-button-div">
                <button className="playlist-button-save button-pink" onClick={() => this.goBackToWelcome()}>
                    Try Again!
                </button>  
            </div>
            <div className="outer-footer-div">
                <Footer/>
            </div>
          </div>

        )
    }
}
 
