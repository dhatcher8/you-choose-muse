import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './GenreSelect.css';

import {spotifyWebApi} from '../../pages/Home'

var prev = null;

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
                // console.log(data.genres)
                // console.log(this.state.genreList);
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
        // console.log(this.state.genreList);
        for (i = 0; i < this.state.genreList.length; i++) {
            var dict = { value: this.state.genreList[i], label: this.state.genreList[i]};
            genreValuePairsList.push(dict);
        }
        // console.log(genreValuePairsList);
        this.setState({genresAndValues: genreValuePairsList});
    }

    updateSelectedGenres(updatedList) {
        this.setState({selectedGenres: updatedList});
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
                <div className="warning-text">
                    You can only submit up to 5 artists.
                </div>
            );
        }
        return;
    }

    render() {
        // console.log(this.state.genresAndValues)
        console.log(this.state.selectedGenres);
        return (
            <div className="genre-container"> Genres: &nbsp; 
                <Select options={this.state.genresAndValues}
                className="mt-auto font-weight-bold"
                placeholder="Search Genres"
                isSearchable
                isMulti
                autoFocus
                onChange={this.updateSelectedGenres.bind(this)}
                />
                { this.renderMaxGenresReached() }
            </div>
        )
    }
}
