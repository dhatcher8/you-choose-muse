import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import githubLogo from '../../images/github-icon.png';
import emailLogo from '../../images/email-icon.png';
import {Link} from 'react-router-dom';


export default class Header extends Component {
    constructor() {
        super();
        this.state = {
          isOpen: false,
          redirect: null,
        }
    }

    // goToGithub() {
    //     this.setState({ redirect: "https://github.com/dhatcher8/spotify-playlist-builder"});
    // }

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

            // <div className="footer-div-full-length">
                
            //     <div className="footer-text-logo-div">
            //         <h3 className="footer-text">Give us Feedback!</h3>
            //         <a href="#" onClick={() => this.goToFeedback()}>
            //             <img className="icon-extra-small" src={emailLogo} alt="Email"/>
            //         </a>
            //     </div>
            //     <div className="footer-text-logo-div">
            //         <h3 className="footer-text">Find us on Github!</h3>
            //         <a href="#" onClick={() => this.goToGithub()}>
            //             <img className="icon-extra-small" src={githubLogo} alt="Github"/>
            //         </a>
            //     </div>
            // </div>


            <div className="footer-div-full-length">
                
                <div className="footer-text-logo-div">
                    {/* <h3 className="footer-text">Give us Feedback!</h3> */}
                    <a href="#" onClick={() => this.goToFeedback()}>
                        <img className="icon-extra-small" src={emailLogo} alt="Email"/>
                    </a>
                    {/* <h3 className="footer-text">Find us on Github!</h3> */}
                    <a href="https://github.com/dhatcher8/spotify-playlist-builder" >
                        <img className="icon-extra-small" src={githubLogo} alt="Github"/>
                    </a>
                </div>
            </div>
        )
    }
}
