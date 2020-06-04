import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

import {spotifyWebApi} from '../../pages/GetTokenRedirect';

var topAllTime = null;
var topSixMonths = null;
var topThisMonth = null;

export default class TopArtistsComponent extends Component {
    constructor(){
        super();
        this.state = {
            playlistGenerationFailure : false,
            topAllTimeList : null,
            topSixMonthsList : null,
            topThisMonthList : null,
            // allTimeActive : true,
            // sixMonthsActive : false,
            // thisMonthActive : false,
            // arr: [
            //     { name: "Top All Time", isActive: false, value: 0 },
            //     { name: "Top Six Months", isActive: false, value: 1 },
            //     { name: "Top This Month", isActive: true, value: 2 }
            // ],
            // activeIndex : 2
            arr: [
                {isActive: false},
                {isActive: false},
                {isActive: true}
            ],
        }
        this.getArtistsAllTime();
        this.getArtistsSixMonths();
        this.getArtistsThisMonth();

    }
    
    getArtistsAllTime() {
        // console.log(spotifyWebApi.getAccessToken());
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "long_term"
        }).then(
            function(data) {
                // newTrackPlaylist = data;
                // this.recentlyPlayedList = data;
                this.setState({ topAllTimeList : data.items})
                console.log(data.items);
                // console.log(this.recentlyPlayedList.items);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getArtistsSixMonths() {
        // console.log(spotifyWebApi.getAccessToken());
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "medium_term"
        }).then(
            function(data) {
                // newTrackPlaylist = data;
                // this.recentlyPlayedList = data;
                this.setState({ topSixMonthsList : data.items})
                // console.log(data.items);
                // console.log(this.recentlyPlayedList.items);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getArtistsThisMonth() {
        // console.log(spotifyWebApi.getAccessToken());
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "short_term"
        }).then(
            function(data) {
                // newTrackPlaylist = data;
                // this.recentlyPlayedList = data;
                this.setState({ topThisMonthList : data.items})
                // console.log(data.items);
                // console.log(this.recentlyPlayedList.items);
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    onClick(index) {
        let tmp = this.state.arr;
        tmp[index].isActive = true;
        if (this.state.activeIndex != index) {
            tmp[this.state.activeIndex].isActive = false;
        }
        this.setState({ arr: tmp });
        this.setState({activeIndex: index});
        
    }
    
    selectTopAllTime() {
        let tmp = this.state.arr;
        tmp[0].isActive = true;
        tmp[1].isActive = false;
        tmp[2].isActive = false;
        this.setState({ arr: tmp });
    }

    selectTopSixMonths() {
        let tmp = this.state.arr;
        tmp[0].isActive = false;
        tmp[1].isActive = true;
        tmp[2].isActive = false;
        this.setState({ arr: tmp });
    }
    
    selectTopThisMonth() {
        let tmp = this.state.arr;
        tmp[0].isActive = false;
        tmp[1].isActive = false;
        tmp[2].isActive = true;
        this.setState({ arr: tmp });
    }

    renderAllTime() {
        if (this.state.arr[0].isActive) {
            var i;
            for (i = 0; i < topAllTime.length; i++) {
                try {
                    topAllTime[i].images[0].url = topAllTime[i].images[0].url;
                }
                catch {
                    topAllTime[i].images[0].url = { url: ''};
                }
            }
            return (
                <div>
                    <div className="playlist-items-background-div">
                        <div className="playlist-list-container-div">
                            {topAllTime.map((result, index) => {
                                return (
                                    <a 
                                        key={result.id} 
                                        href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                        className="playlist-individual-items"
                                        // onClick={this.artistSelected.bind(this,result)}
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        {/* </a><div className="image-wrapper"> */}
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
                                        {/* </div>  */}
                                        <div className="playlist-item-text">
                                            <h6 className="playlist-item-text-one">{result.name}</h6>
                                        </div>
                                        
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return;
        }
    }

    renderSixMonths() {
        if (this.state.arr[1].isActive) {
            var i;
            for (i = 0; i < topSixMonths.length; i++) {
                try {
                    topSixMonths[i].images[0].url = topSixMonths[i].images[0].url;
                }
                catch {
                    topSixMonths[i].images[0].url = { url: ''};
                }
            }
            return (
                <div>
                    <div className="playlist-items-background-div">
                        <div className="playlist-list-container-div">
                            {topSixMonths.map((result, index) => {
                                return (
                                    <a 
                                        key={result.id} 
                                        href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                        className="playlist-individual-items"
                                        // onClick={this.artistSelected.bind(this,result)}
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        {/* </a><div className="image-wrapper"> */}
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
                                        {/* </div>  */}
                                        <div className="playlist-item-text">
                                            <h6 className="playlist-item-text-one">{result.name}</h6>
                                        </div>
                                        
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return;
        }
    }

    renderThisMonth() {
        if (this.state.arr[2].isActive) {
            var i;
            for (i = 0; i < topThisMonth.length; i++) {
                try {
                    topThisMonth[i].images[0].url = topThisMonth[i].images[0].url;
                }
                catch {
                    topThisMonth[i].images[0].url = { url: ''};
                }
            }
            return (
                <div>
                    <div className="playlist-items-background-div">
                        <div className="playlist-list-container-div">
                            {topThisMonth.map((result, index) => {
                                return (
                                    <a 
                                        key={result.id} 
                                        href={null} //later this href can add artist also can later fill in the alt under image source as a common image or something
                                        className="playlist-individual-items"
                                        // onClick={this.artistSelected.bind(this,result)}
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        {/* </a><div className="image-wrapper"> */}
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
                                        {/* </div>  */}
                                        <div className="playlist-item-text">
                                            <h6 className="playlist-item-text-one">{result.name}</h6>
                                        </div>
                                        
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return;
        }
    }

    render() {
        if (this.state.topAllTimeList == null || this.state.topSixMonthsList == null || this.state.topThisMonthList == null) {
            // console.log("here1");
            if (this.state.playlistGenerationFailure) {
                return (
                    <div className="warning-logout-container">
                        <div className="warning-sub-container">
                            Uh oh, you've been logged out! Go back to the home screen and login!
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
            topAllTime = this.state.topAllTimeList;
            topSixMonths = this.state.topSixMonthsList;
            topThisMonth = this.state.topThisMonthList;
        }

        return (
            <div>
                <div className="playlist-header-background-div">
                    <div className="playlist-header-div">
                        <h3 className="title-text-with-select text-color-teal">Top Played Artists</h3>
                        {/* <Button className="btn-primary" className="playlist-button-position" className="playlist-button" className={
                            this.state.buttonIsActive ? 'playlist-btn-active' : 'playlist-btn-inactive'} onClick={() => this.onClick()}
                            >
                        {this.state.buttonText}
                        </Button>   */}
                        {/* {this.state.arr.map((el, index) =>
                            <>
                                <Button className="btn-primary" className="playlist-button" className={
                                el.isActive ? 'playlist-btn-active' : 'playlist-btn-inactive'
                                } key={index} onClick={() => this.onClick(index)}>
                                    <div key={index} onClick={() => this.onClick(index)}>
                                    {el.name}
                                    </div>
                                </Button>
                                <>&nbsp;</>
                            </>
                        )} */}

                        <ul className="top-select-ul">
                            <li className="top-select-links"><a className={this.state.arr[2].isActive ? 'top-select-a-selected' : 'top-select-a'} href="#" onClick={() => this.selectTopThisMonth()}>Past Month</a></li>
                            <li className="top-select-links"><a className={this.state.arr[1].isActive ? 'top-select-a-selected' : 'top-select-a'} href="#" onClick={() => this.selectTopSixMonths()}>Past Six Months</a></li>
                            <li className="top-select-links"><a className={this.state.arr[0].isActive ? 'top-select-a-selected' : 'top-select-a'} href="#" onClick={() => this.selectTopAllTime()}>All Time</a></li>

                        </ul>

                    </div>
                </div>
                <div>
                    { this.renderAllTime() }
                    { this.renderSixMonths() }
                    { this.renderThisMonth() }
                </div>
            </div>
        );
    }
}
