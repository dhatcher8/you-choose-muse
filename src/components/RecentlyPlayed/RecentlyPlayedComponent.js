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
            console.log("here1");
            if (this.state.playlistGenerationFailure) {
                return (
                    <div className="warning-container">
                        An error has occured, the playlist disappeared.
                    </div>
                );
            }
            else {
                return(
                    <div>

                    </div>
                );
            }
        }
        else {
            var rpl = this.state.recentlyPlayedList;
            console.log(rpl);
        }
        console.log("here2");
        // if (!rpl) {
        //     return (
        //         <div className="warning-container">
        //             An error has occured, the playlist disappeared.
        //         </div>
        //     );
        // }
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
                <div className="playlist-background">
                    <div className="playlist-header-container">
                        <h3 className="playlist-title-text">Recently Played Tracks</h3>
                        {/* <Button className="btn-primary" className="playlist-button-position" className="playlist-button" className={
                            this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                            >
                        {this.state.buttonText}
                        </Button>   */}
                    </div>
                    
                </div>
                <div className="playlist-background">
                    <div className="playlist-container">
                        {rpl.map((result, index) => {
                            return (
                                <a 
                                    key={result.id} 
                                    href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                    className="playlist-items"
                                    // onClick={this.artistSelected.bind(this,result)}
                                >
                                    <h6 className="track-number">{index+1}</h6>
                                    {/* </a><div className="image-wrapper"> */}
                                    <img className="album-cover" src={result.track.album.images[0].url} alt={result.track.album.name}/> 
                                    {/* </div>  */}
                                    <div className="track-and-artist">
                                        <h6 className="track-name">{result.track.name}</h6>
                                        <h6 className="artist-name">{result.track.artists[0].name}</h6>
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
