import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {spotifyWebApi} from '../../pages/GetTokenRedirect';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaylistLength.css'

export var globalPlaylistLength = 0;

export default class PlaylistLength extends Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = {
            arr: [
                { name: "20", isActive: false, value: 20 },
                { name: "30", isActive: false, value: 30 },
                { name: "50", isActive: false, value: 50 },
                { name: "100", isActive: false, value: 100 }
            ],
            activeIndex: -1
        };
    }

    onClick(index) {
        let tmp = this.state.arr;
        tmp[index].isActive = true;
        if (this.state.activeIndex != -1) {
            tmp[this.state.activeIndex].isActive = false;
        }
        this.setState({ arr: tmp });
        this.setState({activeIndex: index});
        globalPlaylistLength = this.state.arr[index].value;
        // console.log(this.state.arr);
        
    }

    

    render() {
        
        return (
            <div>
                <div className="sub-title-text-home">Playlist Length: &nbsp;</div>
                
                {this.state.arr.map((el, index) =>
                    <>
                        <button className={
                        el.isActive ? 'playlist-length-button-selected' : 'playlist-length-button'
                        } key={index} onClick={() => this.onClick(index)}>
                            <div key={index} onClick={() => this.onClick(index)}>
                            {el.value}
                            </div>
                        </button>
                        <>&nbsp;</>
                    </>
                )}
            </div>
        )
    }
}
