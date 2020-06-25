# You Choose, Muse

> Playlists Inspired by Your Desires

![](src/images/logo-with-text-big.png)

You Choose, Muse crafts playlist recommendations from a combination of your choice of artists, tracks, and genres. See your top tracks and artists as well as your recently played tracks for inspiration.


## Spotify API

This application uses Spotify Web API to allow users to see different aspects of their play history. The app also uses Spotify's recommendation algorithm to generate tracks similar to the user's chosen parameters and save these playlists to a user's profile.

### The application uses the following parts of Spotify's Web API:

- [Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- [Get users Top Tracks and Artists](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/)
- [Get Recently played tracks for user](https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/)
- [Search for Tracks and Artists](https://developer.spotify.com/documentation/web-api/reference/search/search/)
- [Get a list of available Genres](https://developer.spotify.com/console/get-available-genre-seeds/)
- [Get Track Recommendations based on Seeds](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/)
- [Creating playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/)
- [Adding tracks to playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/)

### To Create a Spotify App

Go to [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/), log in and create a new App.

Add `localhost:3000/callback` as _Redirect URI_ in your Spotify App Settings.

Grab the _Client Id_ and _Client Secret_ that will be added to env.js.

## Development

Application is based on [create-react-app](https://github.com/facebook/create-react-app)

To get the app up and running, from the root directory: 

- Run `npm install`
- Create a `.env` file in the `src` directory and add in your `REACT_APP_CLIENT_ID` and `REACT_APP_CLIENT_SECRET` from your Spotify app
- To start up the server run: `node src/server.js`
- To start up the client, run: `npm start`
