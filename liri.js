// .env hiding keys
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];

switch (liriReturn) {

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("\n" + "type any command after 'node liri.js': " + "\n" +
            "spotify-this-song 'any song title' " + "\n" +
            "movie-this 'any movie title' " + "\n" +
            "do-what-it-says " + "\n");

};

//spotify this song
function spotifyThisSong(trackName) {
    var trackName = process.argv[3];
    if (!trackName) {
        trackName = "I Want it That Way";
    };
    songRequest = trackName;
    spotify.search({
            type: "track",
            query: songRequest
        },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};
//command 3 movie this
// run a request to the OMDB API with the movie specified
function movieThis() {

    //using movieName from var list at top
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            //pull requested data in readable format
            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log(queryUrlResults);
        } else {
            console.log("error: " + err);
            return;
        };
    });
};

// This will create a file called "random.txt"
// It also adds the spotify command
function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song,"I Want it That Way" ', function (err) {
        var song = "spotify-this-song 'I Want it That Way'"
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        };

        // Otherwise, it will print:
        console.log(song);
    });
};