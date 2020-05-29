import React, { Component } from 'react'

import {spotifyWebApi} from '../../pages/GetTokenRedirect';

var rpl = null;

export default class RecentlyPlayedComponent extends Component {
    constructor(){
        super();
        this.state = {
            playlistGenerationFailure : false,
            recentlyPlayedList : null,
        }
        this.getTrackPlaylist();

    }
    
    getTrackPlaylist() {
        // console.log(spotifyWebApi.getAccessToken());
        spotifyWebApi.getMyRecentlyPlayedTracks({
            limit : 50
        }).then(
            function(data) {
                // newTrackPlaylist = data;
                // this.recentlyPlayedList = data;
                this.setState({ recentlyPlayedList : data.items})
                console.log(data);
                // console.log(this.recentlyPlayedList.items);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
        // console.log(newTrackPlaylist);
        // return newTrackPlaylist;
        console.log("we made it here");
        // console.log(recentlyPlayedList);
        // this.render();
    }
    
    render() {
        if (this.state.recentlyPlayedList == null) {
            if (this.state.playlistGenerationFailure) {
                return (
                    <div className="warning-logout-container">
                        <div className="warning-sub-container">
                            Uh oh, You've been logged out! Go back to the home screen and login!
                        </div>
                    </div>
                );
            }
            else {
                return(
                    <div className="background-div-navy">

                    </div>
                );
            }
        }
        else {
            var rpl = this.state.recentlyPlayedList;
            // console.log(rpl);
        }
        var i;
        for (i = 0; i < rpl.length; i++) {
            try {
                rpl[i].track.album.images[0].url = rpl[i].track.album.images[0].url;
            }
            catch {
                rpl[i].track.album.images[0].url = { url: ''};
            }
        }
        return (
            <div>
                <div className="playlist-header-background-div">
                    <div className="playlist-header-div">
                        <h3 className="login-title-text text-color-teal">Recently Played Tracks</h3>
                        {/* <Button className="btn-primary" className="playlist-button-position" className="playlist-button" className={
                            this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                            >
                        {this.state.buttonText}
                        </Button>   */}
                    </div>
                    
                </div>
                <div className="playlist-items-background-div">
                    <div className="playlist-list-container-div">
                        {rpl.map((result, index) => {
                            return (
                                <a 
                                    key={result.id} 
                                    href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                    className="playlist-individual-items"
                                    // onClick={this.artistSelected.bind(this,result)}
                                >
                                    <h6 className="playlist-item-number">{index+1}</h6>
                                    {/* </a><div className="image-wrapper"> */}
                                    <img className="playlist-item-image" src={result.track.album.images[0].url} alt={result.track.album.name}/> 
                                    {/* </div>  */}
                                    <div className="playlist-item-text">
                                        <div className="playlist-item-text-one">{result.track.name}</div>
                                        <div className="playlist-item-text-two">{result.track.artists[0].name}</div>
                                    </div>
                                    
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
