import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import logo from '../../images/spotifylogo.jpg'
import {Link} from 'react-router-dom'
import { FaAlignRight } from "react-icons/fa"
import './Header.css';
import logoBig from '../../images/logo-big.png'


export default class Header extends Component {
    constructor() {
        super();
        this.state = {
          isOpen: false,
          redirect: null,
        }
    }

    handleToggle = () => {
        this.setState( {isOpen:!this.state.isOpen});
    }

    goToBuildPlaylist() {
        this.setState({ redirect: "../home"});
    }

    goToRecentlyPlayed() {
        this.setState({ redirect: "../recently-played"});
    }

    goToTopTracks() {
        this.setState({ redirect: "../top-tracks"});
    }

    goToTopArtists() {
        this.setState({ redirect: "../top-artists"});
    }

    goToAboutUs() {
        this.setState({ redirect: "../about-us"});
    }
    
    render() {
        if (this.state.redirect) {
            if (this.state.redirect !== (".." + window.location.pathname)) {
                return <Redirect to={this.state.redirect} />
            }
 
        }
        return (

            <div className="header-div-full-length">
                <div className="nav-div">
                    <a href='/home'>
                        <img className="logo-small image-align-left" src={logoBig} alt="Logo"/>
                    </a>
                    <ul className="nav-ul">
                        <li className="nav-links"><a className="nav-a" href="#" onClick={() => this.goToBuildPlaylist()}>Build Playlist</a></li>
                        <li className="nav-links"><a className="nav-a" href="#" onClick={() => this.goToRecentlyPlayed()}>Recently Played</a></li>
                        <li className="nav-links"><a className="nav-a" href="#" onClick={() => this.goToTopTracks()}>Top Tracks</a></li>
                        <li className="nav-links"><a className="nav-a" href="#" onClick={() => this.goToTopArtists()}>Top Artists</a></li>
                        <li className="nav-links"><a className="nav-a" href="#" onClick={() => this.goToAboutUs()}>About Us</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
