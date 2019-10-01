require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var spotifyKey = new Spotify(keys.spotify);
var searchTerm = process.argv.splice(2).join("+");


var command = {
    concert: "concert-this",
    spotify: "spotify-this",
    movie: "movie-this",
    says: "do-what-it-says",
};

function bandsAPI(){
    
}