import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import logoBig from '../images/logo-big.png';
import logoWithTextBig from '../images/logo-with-text-big.png';
import Footer from "../components/Footer/Footer";


export default class Welcome extends Component {
    

    render() {
      if (window.innerWidth < 854) {
        return (
          <Redirect to='/width-error'/>
        );
        
      }

      var redirect_link = 'http://localhost:8888/login';
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'production') {
        redirect_link = window.location.origin + '/login';
      }

        return (
          <div className="background-div-navy">
            <div>
              <div className="header-div">
                <div>
                  <img className="logo-small image-align-left" src={logoBig} alt="Logo"/>
                </div>
              </div>
            </div>

            <div>
              <div className="centered-big-logo-div">
                <img className="logo-with-text-large" src={logoWithTextBig} alt="Logo"/>
              </div>
              <div className="title-text text-color-offwhite">
                Build a playlist <span class="text-color-teal">inspired</span> by your <span class="text-color-pink">desires</span>.
              </div>
              <div className="medium-padding-div">
                <a href={redirect_link}>
                  <button className="button-big button-teal">Login with Spotify.</button>
                </a>
              </div>
              <div className="medium-padding-div">
                <a href='/learn-more' className="text-link-bold text-teal">
                  Learn More.
                </a>
              </div> 
            </div>
            <div className="outer-footer-div">
                    <Footer/>
            </div>
          </div>

        )
    }
}
 
