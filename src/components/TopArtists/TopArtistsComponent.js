import React, { Component } from 'react'

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
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "long_term"
        }).then(
            function(data) {
                this.setState({ topAllTimeList : data.items})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getArtistsSixMonths() {
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "medium_term"
        }).then(
            function(data) {
                this.setState({ topSixMonthsList : data.items})
            }.bind(this),
            function (err) {
                console.error(err);
                this.setState({ playlistGenerationFailure : true });
            }.bind(this)
        );
    }

    getArtistsThisMonth() {
        spotifyWebApi.getMyTopArtists({
            limit : 50,
            time_range : "short_term"
        }).then(
            function(data) {
                this.setState({ topThisMonthList : data.items})
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
                    if (topAllTime[i].name == "") {
                        topAllTime.splice(i, 1);
                    } else {
                        if (topAllTime[i].images.length < 1 || topAllTime[i].images == undefined) {
                            topAllTime[i].images[0] = { url: ''};
                        } else {
                            topAllTime[i].images[0].url = { url: ''};
                        }
                    }
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
                                        href={null}
                                        className="playlist-individual-items"
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
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
                    if (topSixMonths[i].name == "") {
                        topSixMonths.splice(i, 1);
                    } else {
                        if (topSixMonths[i].images.length < 1 || topSixMonths[i].images == undefined) {
                            topSixMonths[i].images[0] = { url: ''};
                        } else {
                            topSixMonths[i].images[0].url = { url: ''};
                        }
                    }
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
                                        href={null}
                                        className="playlist-individual-items"
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
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
                    if (topThisMonth[i].name == "") {
                        topThisMonth.splice(i, 1);
                    } else {
                        if (topThisMonth[i].images.length < 1 || topThisMonth[i].images == undefined) {
                            topThisMonth[i].images[0] = { url: ''};
                        } else {
                            topThisMonth[i].images[0].url = { url: ''};
                        }
                    }
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
                                        href={null}
                                        className="playlist-individual-items"
                                    >
                                        <h6 className="playlist-item-number">{index+1}</h6>
                                        <img className="playlist-item-image" src={result.images[0].url} alt={result.name}/> 
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
