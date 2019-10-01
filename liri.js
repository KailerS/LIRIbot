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
            console.log(response.tracks.items[0]);
        }).catch(function(err) {
            console.log(err);
        });    
};


if (userCommand === command.spotify){
    searchSpotify();
};