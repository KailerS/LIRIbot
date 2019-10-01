require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var spotifyKey = new Spotify(keys.spotify);
var searchTerm = process.argv.slice(3).join("+");
var spotifyTerm = process.argv.slice(3).join(" ")
var userCommand = process.argv[2];


var command = {
    concert: "concert-this",
    spotify: "spotify-this",
    movie: "movie-this",
    says: "do-what-it-says",
};

function searchSpotify(){
    spotifyKey
    .search({ type: 'track', query: spotifyTerm })
        .then(function(response) {
            console.log(`The artist is ${response.tracks.items[0].artists[0].name}`);
            console.log(`The title of the track is ${response.tracks.items[0].name}`);
            console.log(`A preview can be found at ${response.tracks.items[0].preview_url}`);
            console.log(`The album name is ${response.tracks.items[0].album.name}`);
        }).catch(function(err) {
            console.log(err);
        });    
};


switch (userCommand){
    case command.concert:
        searchConcert()
        break;
    case command.spotify:
        searchSpotify()
        break;
    case command.movie:
        searchMovie()
        break;
    case command.says:
        doWhatItSays()
        break;
    default:
        return console.log("Please select a valid command");        

};