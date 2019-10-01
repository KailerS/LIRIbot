require("dotenv").config();
var moment = require('moment');
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
    spotify: "spotify-this-song",
    movie: "movie-this",
    says: "do-what-it-says",
};

function searchConcert(term){
    if (!term){
        return console.log("Please Enter a Valid Search Term")
    }
    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
    .then(function (response){
        for (i=0;i<response.data.length;i++){
        var date = response.data[i].datetime;
        console.log(`Date: ${moment(date).format("L")}`);
        console.log(`Name of Venue: ${response.data[i].venue.name}`);
        console.log(`Location: ${response.data[i].venue.city}`);
        console.log("\n")
        };    

    }).catch(function(err) {
            console.log(err);
    });
};

function searchSpotify(term){
    if (!term){
        console.log("By not entering a track name you've selected the default.")
       term = "Dreams and Nightmares"      
    };
    spotifyKey
    .search({ type: 'track', query: term })
        .then(function(response) {
            console.log(`The artist is ${response.tracks.items[0].artists[0].name}`);
            console.log(`The title of the track is ${response.tracks.items[0].name}`);
            console.log(`A preview can be found at ${response.tracks.items[0].preview_url}`);
            console.log(`The album name is ${response.tracks.items[0].album.name}`);
        }).catch(function(err) {
            console.log(err);
        });    
};

function searchMovie(term){
    if(!term){
        console.log("By not entering a movie name you've selected the default.")
        term = "Mr.+Nobody";
    };
    axios.get(`http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`)
    .then(function(response){
        console.log(`Movie Title: ${response.data.Title}`);
        console.log(`Release Year: ${response.data.Year}`);
        console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
        console.log(`Production Location: ${response.data.Country}`);
        console.log(`Language(s): ${response.data.Language}`);
        console.log(`Plot Summary: ${response.data.Plot}`);
        console.log(`Cast: ${response.data.Actors}`);
    }).catch(function(err) {
        console.log(err);
    });
}


switch (userCommand){
    case command.concert:
        searchConcert(searchTerm)
        break;
    case command.spotify:
        searchSpotify(spotifyTerm)
        break;
    case command.movie:
        searchMovie(searchTerm)
        break;
    case command.says:
        doWhatItSays()
        break;
    default:
        return console.log("Please select a valid command");        

};