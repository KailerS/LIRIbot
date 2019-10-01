require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var spotifyKey = new Spotify(keys.spotify);


var command = {
    concert: "concert-this",
    spotify: "spotify-this",
    movie: "movie-this",
    says: "do-what-it-says",
}