import React, { Component } from 'react'
import logo from '../../images/spotifylogo.jpg'
import {Link} from 'react-router-dom'
import { FaAlignRight } from "react-icons/fa"
import './Header.css';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
          isOpen: false
        }
    }

    handleToggle = () => {
        this.setState( {isOpen:!this.state.isOpen});
    }
    
    render() {

        return (

            <div className="nav-div">
            <nav className="navbar" className="container">
                <div classNamke="nav-center">
                <div className="nav-header">
                <Link to="/home">
                <img src={logo} alt="Spotify Builder App" />
                </Link>
                <button type="button" className="nav-btn">
                    <FaAlignRight className="nav-icon"/>
                </button>
                </div>
                </div>
            </nav>
            </div>
        )
    }
}
