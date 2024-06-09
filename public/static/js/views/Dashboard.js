// Import the AbstractView class from the AbstractView.js file
import AbstractView from "./AbstractView.js";

// Define class
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    // Generate the HTML content for the Dashboard view
    async getHtml() {
        return `
            <!-- Container for the entire dashboard -->
            <div class="container-fluid mt-4 dashboard-bg">
                <div class="row mb-4">
                    <div class="col-12 text-center bg-grey rounded p-3 text-white first-row" id="top-genre-container">
                        <h1>Your Top Genre: <span id="top-genre"></span></h1>
                        <p>Welcome to your music genre tracker! Add your favorite songs and see what your music taste is. If you have many top genres, your music taste is diverse!</p>
                    </div>
                </div>
                <!-- Row for statistics -->
                <div class="row gy-4">
                    <div class="col-md-4">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Music Taste Report</h2>

                            <div class="genre-percentage">
                                <p>Average Song Length:</p>
                                <h1><span id="avg-song-length"></span></h1>
                            </div>

                            <div class="genre-percentage">
                                <p>Number of Genres:</p>
                                <h1><span id="genres-number"></span></h1>
                            </div>

                            <div class="genre-percentage">
                                <p>Average Year of Release:</p>
                                <h1><span id="avg-year-release"></span></h1>
                            </div>
                        </div>
                    </div>
                <!-- Column for Top 3 Genres -->
                <div class="col-md-4 ">
                    <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height" id="top-genres-container">
                        <h2>Top 3 Genres</h2>
                        <div class="genre-container top-genre"></div>
                        <div class="genre-container second-genre"></div>
                        <div class="genre-container third-genre"></div>
                    </div>
                </div>
                    <!-- Column for Most Recent Song -->
                    <div class="col-md-4 ">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height" id="most-recent-song">
                            <h2>Most Recent Song</h2>
                            <div class="song-info" id="most-recent-song-container">
                                <!-- Most recent song will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Song list table -->
                <div class="container-fluid bg-grey rounded p-3 text-white mt-4 song-list">
                    <h2>My Favorite Anthems</h2>
                    <div class="row header">
                        <div class="col-auto">Cover</div>
                        <div class="col">Song</div>
                        <div class="col">Artist</div>
                        <div class="col">Genre</div>
                        <div class="col">Date Added</div>
                        <div class="col">Duration</div>
                        <div class="col-auto">Clear</div>
                    </div>
                    <div class="row gy-4" id="favorite-songs-container">
                        <!-- Favorite songs will be loaded here -->
                    </div>
                </div>
                <!-- Additional container row for recent songs -->
                <div class="container-fluid bg-grey rounded p-3 text-white mt-4 recent-songs-container" id="recent-songs-container">
                    <h2>Recent Songs You Added</h2>
                    <div class="row gy-4">
                        <!-- Recent songs will be loaded here -->
                    </div>
                </div>
            </div>
        `;
    }

    async onRender() {
        // Update the Top 3 Genres section
        this.updateTopGenres();
    
        // Load favorite songs
        await this.loadFavSongs();
    
        // Load most recent song
        this.loadMostRecentSong();
    
        // Update the top genre based on favorite songs
        await this.updateTopGenreFromLocalStorage();
    
        // Calculate the average song duration
        const avgSongDuration = await this.calculateAverageSongDuration();
    
        // Update the HTML element with the average song duration
        document.getElementById('avg-song-length').innerText = avgSongDuration !== 'N/A' ? `${avgSongDuration}` : 'N/A';
    
        // Calculate and display the number of different genres
        const numberOfGenres = await this.calculateNumberOfGenres();
        document.getElementById('genres-number').innerText = numberOfGenres;

        // Calculate and display the average song release date
        const avgReleaseDate = await this.calculateAverageReleaseDate();
        document.getElementById('avg-year-release').innerText = avgReleaseDate !== 'N/A' ? avgReleaseDate.getFullYear() : 'N/A';
    }

    // Calculate the average release date of the songs
    async calculateAverageReleaseDate() {
        try {
            // Retrieve saved songs from local storage
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
    
            // If there are no saved songs or the array is empty, return 'N/A'
            if (!savedSongs || savedSongs.length === 0) {
                console.log('Average Release Date: N/A');
                return 'N/A';
            }
    
            // Calculate the total of release dates in milliseconds
            const totalReleaseDates = savedSongs.reduce((acc, song) => {
                const parsedSong = JSON.parse(song);
                const releaseDate = parsedSong.release_date;
                // If the release date exists, add it to the accumulator
                if (releaseDate) {
                    return acc + new Date(releaseDate).getTime();
                } else {
                    return acc;
                }
            }, 0);
    
            // Calculate the average release date timestamp
            const averageReleaseDateTimestamp = Math.round(totalReleaseDates / savedSongs.length);
            // Convert the average release date timestamp to a Date object
            const averageReleaseDate = new Date(averageReleaseDateTimestamp);
    
            // Log the average release date in a human-readable format
            console.log(`Average Release Date: ${averageReleaseDate.toLocaleDateString()}`);
    
            // Return the average release date
            return averageReleaseDate;
        } catch (error) {
            // If an error occurs during calculation, log it and return 'N/A'
            console.error('Error calculating average release date:', error);
            return 'N/A';
        }
    }

    // Calculate the average duration of the songs
    async calculateAverageSongDuration() {
        try {
            // Attempt to parse saved songs from local storage
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        
            // If there are no saved songs or the array is empty, return 'N/A'
            if (!savedSongs || savedSongs.length === 0) {
                return 'N/A';
            }
        
            // Calculate the total duration of songs in seconds
            const totalDurationSeconds = savedSongs.reduce((acc, song) => {
                const parsedSong = JSON.parse(song);
                // Add the duration of each song to the accumulator
                return acc + parseInt(parsedSong.duration);
            }, 0);
        
            // Calculate the average duration of songs in seconds
            const averageDurationSeconds = Math.round(totalDurationSeconds / savedSongs.length);
        
            // Convert the average duration to minutes and seconds
            const averageDurationMinutes = Math.floor(averageDurationSeconds / 60);
            const averageDurationSecondsRemaining = averageDurationSeconds % 60;
        
            // Format the average duration in minutes:seconds
            const formattedAverageDuration = `${averageDurationMinutes}:${averageDurationSecondsRemaining.toString().padStart(2, '0')}`;
        
            // Log the average track duration
            console.log(`Average Track Duration: ${formattedAverageDuration}`);
        
            // Return the formatted average duration
            return formattedAverageDuration;
        } catch (error) {
            // If an error occurs during calculation, log it and return 'N/A'
            console.error('Error calculating average song duration:', error);
            return 'N/A';
        }        
    }

    async fetchGenreData() {
        // Replace this with actual API call logic
        // This is just a placeholder example
        return {
            pop: 30,
            rap: 20,
            rock: 25,
            jazz: 15,
            classical: 10
        };
    }

    // Calculate the number of unique genres in the saved songs
    async calculateNumberOfGenres() {
        try {
            // Attempt to parse saved songs from local storage
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
    
            // If there are no saved songs or the array is empty, return 0 and log a message
            if (!savedSongs || savedSongs.length === 0) {
                console.log('Number of Genres: 0');
                return 0;
            }
    
            // Create a Set to store unique genres
            const genresSet = new Set();
    
            // Iterate over each saved song and add its genre to the set
            savedSongs.forEach((song) => {
                const parsedSong = JSON.parse(song);
                genresSet.add(parsedSong.genre);
            });
    
            // Get the number of unique genres from the set
            const numberOfGenres = genresSet.size;
    
            // Log the number of genres
            console.log(`Number of Genres: ${numberOfGenres}`);
    
            // Return the number of genres
            return numberOfGenres;
        } catch (error) {
            // If an error occurs during calculation, log it and return 'N/A'
            console.error('Error calculating number of genres:', error);
            return 'N/A';
        }
    }


    // Load favorite songs from local storage and render them
    async loadFavSongs() {
        // Log message indicating the loading of saved songs
        console.log("I am loading saved songs");
        // Retrieve saved songs from local storage
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        // Get references to HTML containers
        const favoriteContainer = document.getElementById('favorite-songs-container');
        const recentContainer = document.querySelector('#recent-songs-container .row');

        // If there are no saved songs or the array is empty, display messages and return
        if (!savedSongs || savedSongs.length === 0) {
            favoriteContainer.innerHTML = `<p>No favorite songs added yet.</p>`;
            recentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            document.getElementById('most-recent-song-container').innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }

        // Populate favorite songs container with HTML generated from saved songs
        favoriteContainer.innerHTML = savedSongs.map(song => this.generateFavoriteSongHTML(song)).join('');

        // Determine the number of recent songs to display (maximum 5)
        const repeatList = Math.min(5, savedSongs.length);
        const dummyList = Array.from(Array(repeatList).keys());
        recentContainer.innerHTML = dummyList.map((song, index) => this.generateRecentSongHTML(index)).join('');

        // Get the most recent song from the saved songs array
        const mostRecentSong = JSON.parse(savedSongs[0]);
        // Populate the container for the most recent song with HTML generated from the most recent song
        document.getElementById('most-recent-song-container').innerHTML = this.generateRecentSongHTML(0);
    }

    // Load the most recent song from local storage and render it
    loadMostRecentSong() {
        // Retrieve saved songs from local storage
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const mostRecentContainer = document.getElementById('most-recent-song-container');
    
        // If there are no saved songs or the array is empty, display a message and return
        if (!savedSongs || savedSongs.length === 0) {
            mostRecentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }
    
        // Sort the saved songs array based on the added time of each song in descending order
        savedSongs.sort((a, b) => new Date(JSON.parse(b).addedTime) - new Date(JSON.parse(a).addedTime));
    
        // Get the most recent song from the sorted saved songs array
        const mostRecentSong = JSON.parse(savedSongs[0]);
    
        // Generate HTML for the most recent song
        const mostRecentSongHTML = `
            <img src="${mostRecentSong.album.cover}" alt="Album Cover" class="album-cover">
            <p class="song-name" style="font-size: 18px; margin-bottom: 2px;">${mostRecentSong.title}</p>
            <p class="artist" style="font-size: 13px; margin-top: 2px;">${mostRecentSong.artist.name}</p>
        `;
        // Populate the container for the most recent song with the generated HTML
        mostRecentContainer.innerHTML = mostRecentSongHTML;
    }

    // Update the Top 3 Genres section based on saved songs
    updateTopGenres() {
        var topSongsDict = {};
        // Retrieve saved songs from local storage
        const songs = JSON.parse(localStorage.getItem('savedSongs'));
        // Iterate over each saved song
        songs.forEach((songJSON) => {
            const parsedSong = JSON.parse(songJSON);
            const genre = parsedSong.genre;
            topSongsDict[genre] = (topSongsDict[genre] || 0) + 1;
        });
        // Determine the number of top genres to display (maximum 3)
        const topNMany = Math.min(3, songs.length);
        // Sort the top genres dictionary by the count of songs in descending order
        const topNDictGenres = Object.entries(topSongsDict).sort((a, b) => b[1] - a[1]);
        // Extract the names of the top genres
        const topGenreNames = topNDictGenres.map(([g]) => g);
        
        // Log the names of the top genres
        console.log(`Top genres are ${topGenreNames}`);

        // Get reference to the container for top genres
        const topGenresContainer = document.getElementById('top-genres-container');

        // Generate HTML for the top genres
        const topGenresHTML = `
            <h2>Top 3 Genres</h2>
            <div class="genre-container top-genre" style="background-color: brightblue;">
                <p>${topGenreNames[0]}</p>
            </div>
            <div class="genre-container second-genre" style="background-color: darkblue;">
                <p>${topGenreNames[1]}</p>
            </div>
            <div class="genre-container third-genre" style="background-color: greyblue;">
                <p>${topGenreNames[2]}</p>
            </div>
        `;

        // Populate the container for top genres with the generated HTML
        topGenresContainer.innerHTML = topGenresHTML;
    }

    // Generate HTML for a favorite song entry
    generateFavoriteSongHTML(song) {
        // Destructure song object properties
        const { id, title, artist, genre, duration, album, addedTime } = JSON.parse(song);
        // Generate HTML for the favorite song
        return `
            <div class="row song-row" data-song-id="${id}">
                <div class="col-auto"><img src="${album.cover}" alt="Album Cover" style="max-width: 50px;"></div>
                <div class="col" style="font-size: 14px;">${title}</div>
                <div class="col" style="font-size: 14px;">${artist.name}</div>
                <div class="col" style="font-size: 14px;">${genre}</div>
                <div class="col" style="font-size: 14px;">${new Date(addedTime).toLocaleDateString()}</div>
                <div class="col" style="font-size: 14px;">${Math.floor(duration / 60)}:${duration % 60}</div>
                <div class="col-auto">
                    <button class="btn btn-danger btn-custom-remove" onclick="deleteSong('${id}')">X</button>
                </div>
            </div>
        `;
    }

    // Generate HTML for a recent song entry
    generateRecentSongHTML(index) {
        // Retrieve saved songs from local storage
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        // Get the last 5 saved songs and reverse the order
        const sortedSongs = savedSongs.slice(-5).reverse();
        // Destructure the title, artist, and album from the selected song
        const { title, artist, album } = JSON.parse(sortedSongs[index]);
        // Define CSS classes for each column in the grid
        const columnClasses = ['col-md-2 left', 'col-md-2 middle', 'col-md-2 middle', 'col-md-2 middle', 'col-md-2 right'];
        // Generate HTML for the recent song item
        return `
            <div class="${columnClasses[index]}">
                <div class="bg-light-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                    <img src="${album.cover}" alt="Album Cover" class="album-cover">
                    <p class="song-name" style="font-size: 18px; margin-bottom: 2px;">${title}</p>
                    <p class="artist" style="font-size: 13px; margin-top: 2px;">${artist.name}</p>
                </div>
            </div>
        `;
    }

    // Update the top genre based on saved songs
    async updateTopGenreFromLocalStorage() {
        // Initialize an empty dictionary to store genre counts
        const topSongsDict = {};
        // Retrieve saved songs from local storage or initialize an empty array if no songs are found
        const songs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    
        // Iterate through each saved song and count occurrences of each genre
        songs.forEach((songJSON) => {
            const parsedSong = JSON.parse(songJSON);
            const genre = parsedSong.genre;
            topSongsDict[genre] = (topSongsDict[genre] || 0) + 1;
        });
    
        // Get the entries and sort them by the number of songs
        const topNDictGenres = Object.entries(topSongsDict).sort((a, b) => b[1] - a[1]);
    
        // Find the maximum number of songs in any genre
        const maxCount = topNDictGenres.length > 0 ? topNDictGenres[0][1] : 0;
        // Find all genres with this maximum count
        const topGenres = topNDictGenres.filter(([genre, count]) => count === maxCount).map(([genre]) => genre);
    
        console.log(`Top genres are ${topGenres}`);
    
        // Get the HTML element for displaying the top genre
        const topGenreElement = document.getElementById('top-genre');
    
        // Update the top genre element based on the number of top genres found
        if (topGenres.length === 0) {
            topGenreElement.innerText = "Unknown";
        } else if (topGenres.length === 1) {
            topGenreElement.innerText = topGenres[0];
        } else if (topGenres.length === 2) {
            topGenreElement.innerText = `${topGenres[0]} & ${topGenres[1]}`;
        } else {
            topGenreElement.innerText = "Diverse";
        }
    }
}