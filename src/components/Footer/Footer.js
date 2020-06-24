import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import githubLogo from '../../images/github-icon.png';
import emailLogo from '../../images/email-icon.png';


export default class Header extends Component {
    constructor() {
        super();
        this.state = {
          redirect: null,
        }
    }

    goToFeedback() {
        this.setState({ redirect: "../about-us"});
    }
    
    render() {
        if (this.state.redirect) {
            if (this.state.redirect !== (".." + window.location.pathname)) {
                return <Redirect to={this.state.redirect} />
            }
 
        }
        return (

            <div className="footer-div-full-length">
                
                <div className="footer-text-logo-div">
                    <a href="mailto:youchoosemuse@gmail.com">
                        <img className="icon-extra-small" src={emailLogo} alt="Email"/>
                    </a>
                    <a href="https://github.com/dhatcher8/spotify-playlist-builder" target="_blank" rel="noopener noreferrer">
                        <img className="icon-extra-small" src={githubLogo} alt="Github"/>
                    </a>
                </div>
            </div>
        )
    }
}
