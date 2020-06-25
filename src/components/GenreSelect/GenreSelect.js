import React, { Component } from 'react';
import Select from 'react-select';
import './GenreSelect.css';

import {spotifyWebApi} from '../../pages/GetTokenRedirect'
import {selectStyle} from './GenreSelectStyle';

var prev = null;
export var globalGenresList = [];

export default class GenreSelect extends Component {

    constructor() {
        super();
        this.state = {
            search: '',
            genreList: [],
            tooManyGenres: false,
            genresAndValues: [],
            selectedGenres: []
        }
        this.getGenreList();
    }

    getGenreList() {
        if (prev !== null) {
            prev.abort();
        }

        prev = spotifyWebApi.getAvailableGenreSeeds();
        prev.then(
            function (data) {
                prev = null;
                this.setState({genreList: data.genres});
                this.createGenreObject();
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
        
    }

    createGenreObject() {
        var i;
        var genreValuePairsList = []
        for (i = 0; i < this.state.genreList.length; i++) {
            var dict = { value: this.state.genreList[i], label: this.state.genreList[i]};
            genreValuePairsList.push(dict);
        }
        this.setState({genresAndValues: genreValuePairsList});
    }

    updateSelectedGenres(updatedList) {
        if (updatedList == null) {
            this.setState({selectedGenres: []});
            return;
        }
        this.setState({selectedGenres: updatedList});
        globalGenresList = updatedList;
        if (updatedList.length > 5) {
            this.setState({tooManyGenres: true})
        }
        else {
            this.setState({tooManyGenres: false})
        }
    }

    

    renderMaxGenresReached() {
        if (this.state.tooManyGenres) {
            return (
                <div className="warning-small-container">
                    You can only choose up to 5 genres.
                </div>
            );
        }
        return;
    }

    render() {

        function customTheme(theme) {
            return {
                ... theme,
                // borderRadius: 10,
                backgroundColor: '#3fc1c9',
                colors: {
                    ... theme.colors,
                    primary25: '#3fc1c9',
                    primary: '#3fc1c9',
                    neutral0: '#3fc1c9',
                    dangerLight: '#ff5c87',
                    neutral5: '#f5f5f5',
                    neutral10: '#f5f5f5',
                    neutral20: '#f5f5f5',
                    neutral30: '#f5f5f5',
                    neutral40: '#f5f5f5',
                    neutral50: '#f5f5f5',
                    neutral60: '#f5f5f5',
                    neutral70: '#f5f5f5',
                    neutral80: '#f5f5f5',
                    neutral90: '#f5f5f5',
                }
            }
        }
        return (

            <div>
                <div className="genre-builder-element-div">
                    <div className="builder-elements-right-align">
                        <h3 className="sub-title-text-home"> Genres: &nbsp;</h3>
                    </div>
                    <div className="builder-elements-left-align">
                        <Select options={this.state.genresAndValues}
                            className="genre-input"
                            theme={customTheme}
                            styles={selectStyle}
                            placeholder="Search Genres..."
                            isSearchable
                            isMulti
                            autoFocus
                            onChange={this.updateSelectedGenres.bind(this)}
                        />
                    </div>
                    { this.renderMaxGenresReached() }
                </div>
            </div>
        )
    }

    
}
