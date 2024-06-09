import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <div class="container-fluid mt-4 dashboard-bg">
                <div class="row mb-4">
                    <div class="col-12 text-center bg-grey rounded p-3 text-white first-row" id="top-genre-container">
                        <h1>Your Top Genre: <span id="top-genre"></span></h1>
                        <p>Welcome to your music genre tracker! Add your favorite songs and see what your music taste is. If you have many top genres, your music taste is diverse!</p>
                    </div>
                </div>
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
                <div class="col-md-4 ">
                    <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height" id="top-genres-container">
                        <h2>Top 3 Genres</h2>
                        <div class="genre-container top-genre"></div>
                        <div class="genre-container second-genre"></div>
                        <div class="genre-container third-genre"></div>
                    </div>
                </div>
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

    async calculateAverageReleaseDate() {
        try {
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));

            if (!savedSongs || savedSongs.length === 0) {
                console.log('Average Release Date: N/A');
                return 'N/A';
            }

            const totalReleaseDates = savedSongs.reduce((acc, song) => {
                const parsedSong = JSON.parse(song);
                const releaseDate = parsedSong.release_date;
                if (releaseDate) {
                    return acc + new Date(releaseDate).getTime();
                } else {
                    return acc;
                }
            }, 0);

            const averageReleaseDateTimestamp = Math.round(totalReleaseDates / savedSongs.length);
            const averageReleaseDate = new Date(averageReleaseDateTimestamp);

            console.log(`Average Release Date: ${averageReleaseDate.toLocaleDateString()}`);

            return averageReleaseDate;
        } catch (error) {
            console.error('Error calculating average release date:', error);
            return 'N/A';
        }
    }

    async calculateAverageSongDuration() {
        try {
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
    
            if (!savedSongs || savedSongs.length === 0) {
                return 'N/A';
            }
    
            const totalDurationSeconds = savedSongs.reduce((acc, song) => {
                const parsedSong = JSON.parse(song);
                return acc + parseInt(parsedSong.duration);
            }, 0);
    
            const averageDurationSeconds = Math.round(totalDurationSeconds / savedSongs.length);
    
            const averageDurationMinutes = Math.floor(averageDurationSeconds / 60);
            const averageDurationSecondsRemaining = averageDurationSeconds % 60;
    
            // Format the average duration in minutes:seconds
            const formattedAverageDuration = `${averageDurationMinutes}:${averageDurationSecondsRemaining.toString().padStart(2, '0')}`;
    
            console.log(`Average Track Duration: ${formattedAverageDuration}`);
    
            return formattedAverageDuration;
        } catch (error) {
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

    async calculateNumberOfGenres() {
        try {
            const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
    
            if (!savedSongs || savedSongs.length === 0) {
                console.log('Number of Genres: 0');
                return 0;
            }
    
            const genresSet = new Set();
    
            savedSongs.forEach((song) => {
                const parsedSong = JSON.parse(song);
                genresSet.add(parsedSong.genre);
            });
    
            const numberOfGenres = genresSet.size;
    
            console.log(`Number of Genres: ${numberOfGenres}`);
    
            return numberOfGenres;
        } catch (error) {
            console.error('Error calculating number of genres:', error);
            return 'N/A';
        }
    }


    async loadFavSongs() {
        console.log("I am loading saved songs");
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const favoriteContainer = document.getElementById('favorite-songs-container');
        const recentContainer = document.querySelector('#recent-songs-container .row');

        if (!savedSongs || savedSongs.length === 0) {
            favoriteContainer.innerHTML = `<p>No favorite songs added yet.</p>`;
            recentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            document.getElementById('most-recent-song-container').innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }

        favoriteContainer.innerHTML = savedSongs.map(song => this.generateFavoriteSongHTML(song)).join('');

        const repeatList = Math.min(5, savedSongs.length);
        const dummyList = Array.from(Array(repeatList).keys());
        recentContainer.innerHTML = dummyList.map((song, index) => this.generateRecentSongHTML(index)).join('');

        const mostRecentSong = JSON.parse(savedSongs[0]);
        document.getElementById('most-recent-song-container').innerHTML = this.generateRecentSongHTML(0);
    }

    loadMostRecentSong() {
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const mostRecentContainer = document.getElementById('most-recent-song-container');
    
        if (!savedSongs || savedSongs.length === 0) {
            mostRecentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }
    
        savedSongs.sort((a, b) => new Date(JSON.parse(b).addedTime) - new Date(JSON.parse(a).addedTime));
    
        const mostRecentSong = JSON.parse(savedSongs[0]);
    
        const mostRecentSongHTML = `
            <img src="${mostRecentSong.album.cover}" alt="Album Cover" class="album-cover">
            <p class="song-name" style="font-size: 18px; margin-bottom: 2px;">${mostRecentSong.title}</p>
            <p class="artist" style="font-size: 13px; margin-top: 2px;">${mostRecentSong.artist.name}</p>
        `;
    
        mostRecentContainer.innerHTML = mostRecentSongHTML;
    }

    updateTopGenres() {
        var topSongsDict = {};
        const songs = JSON.parse(localStorage.getItem('savedSongs'));
        songs.forEach((songJSON) => {
            const parsedSong = JSON.parse(songJSON);
            const genre = parsedSong.genre;
            topSongsDict[genre] = (topSongsDict[genre] || 0) + 1;
        });
        const topNMany = Math.min(3, songs.length);
        const topNDictGenres = Object.entries(topSongsDict).sort((a, b) => b[1] - a[1]);
        const topGenreNames = topNDictGenres.map(([g]) => g);
        
        console.log(`Top genres are ${topGenreNames}`);

        const topGenresContainer = document.getElementById('top-genres-container');

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

        topGenresContainer.innerHTML = topGenresHTML;
    }

    generateFavoriteSongHTML(song) {
        const { title, artist, genre, duration, album } = JSON.parse(song);
        const addedTime = JSON.parse(song).addedTime;
        return `
            <div class="row song-row">
                <div class="col-auto"><img src="${album.cover}" alt="Album Cover" style="max-width: 50px;"></div>
                <div class="col" style="font-size: 14px;">${title}</div>
                <div class="col" style="font-size: 14px;">${artist.name}</div>
                <div class="col" style="font-size: 14px;">${genre}</div>
                <div class="col" style="font-size: 14px;">${new Date(addedTime).toLocaleDateString()}</div>
                <div class="col" style="font-size: 14px;">${Math.floor(duration / 60)}:${duration % 60}</div>
            </div>
        `;
    }

    generateRecentSongHTML(index) {
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const sortedSongs = savedSongs.slice(-5).reverse();
        const { title, artist, album } = JSON.parse(sortedSongs[index]);
        const columnClasses = ['col-md-2 left', 'col-md-2 middle', 'col-md-2 middle', 'col-md-2 middle', 'col-md-2 right'];
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

    async updateTopGenreFromLocalStorage() {
        const topSongsDict = {};
        const songs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    
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
    
        const topGenreElement = document.getElementById('top-genre');
    
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