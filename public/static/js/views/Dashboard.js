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
                    <div class="col-12 text-center bg-grey rounded p-3 text-white first-row">
                        <h1>Your Top Genre: Jazz House</h1>
                        <p>Jazz house is a style of house music closely related to deep house, which can be described as an attempt to translate the atmosphere of jazz music into an electronic setting.</p>
                    </div>
                </div>
                <div class="row gy-4">
                    <div class="col-md-4">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Music Taste Report</h2>
                            <div class="genre-percentage">
                                <label>Pop</label>
                                <div class="progress">
                                    <div class="progress-bar" id="pop-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="genre-percentage">
                                <label>Rap</label>
                                <div class="progress">
                                    <div class="progress-bar" id="rap-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="genre-percentage">
                                <label>Rock</label>
                                <div class="progress">
                                    <div class="progress-bar" id="rock-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="genre-percentage">
                                <label>Jazz</label>
                                <div class="progress">
                                    <div class="progress-bar" id="jazz-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="genre-percentage">
                                <label>Classical</label>
                                <div class="progress">
                                    <div class="progress-bar" id="classical-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 adjusted-padding">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height" id="top-genres-container">
                            <h2>Top 3 Genres</h2>
                            <div class="genre-container top-genre"></div>
                            <div class="genre-container second-genre"></div>
                            <div class="genre-container third-genre"></div>
                        </div>
                    </div>
                    <div class="col-md-4 adjusted-padding">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
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
        // Fetch genre data from the API
        const genres = await this.fetchGenreData();
        // Update the progress bars
        this.updateProgressBars(genres);
        // Update the Top 3 Genres section
        this.updateTopGenres(genres);
    
        // Load favorite songs
        await this.loadFavSongs();
    
        // Load most recent song
        this.loadMostRecentSong();
    
        // Update the top genre based on favorite songs
        this.updateTopGenreFromLocalStorage();
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

        // Sort the songs by date added in descending order
        savedSongs.sort((a, b) => new Date(JSON.parse(b).addedTime) - new Date(JSON.parse(a).addedTime));

        // Take the last 5 most recently added songs
        const recentSongs = savedSongs.slice(-5).reverse(); // Reverse to show the latest added on the left

        // Generate HTML for each recent song and populate the container
        recentContainer.innerHTML = recentSongs.map((song, index) => this.generateRecentSongHTML(song, index)).join('');

        // Load the most recent song separately
        const mostRecentSong = JSON.parse(savedSongs[0]);
        document.getElementById('most-recent-song-container').innerHTML = this.generateRecentSongHTML(mostRecentSong, 0);
    }

    loadMostRecentSong() {
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        console.log('Saved Songs:', savedSongs); // Debugging line
        const mostRecentContainer = document.getElementById('most-recent-song-container');
    
        if (!savedSongs || savedSongs.length === 0) {
            mostRecentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }
    
        // Sort the songs by date added in descending order
        savedSongs.sort((a, b) => new Date(JSON.parse(b).addedTime) - new Date(JSON.parse(a).addedTime));
    
        const mostRecentSong = JSON.parse(savedSongs[0]);
        console.log('Most Recent Song:', mostRecentSong); // Debugging line
    
        // Generate HTML for the most recent song
        const mostRecentSongHTML = `
            <img src="${mostRecentSong.album.cover}" alt="Album Cover" class="album-cover">
            <p class="song-name" style="font-size: 18px; margin-bottom: 2px;">${mostRecentSong.title}</p>
            <p class="artist" style="font-size: 13px; margin-top: 2px;">${mostRecentSong.artist.name}</p>
        `;
    
        mostRecentContainer.innerHTML = mostRecentSongHTML;
    }
    updateProgressBars(genres) {
        document.getElementById('pop-progress').style.width = `${genres.pop}%`;
        document.getElementById('pop-progress').setAttribute('aria-valuenow', genres.pop);
        
        document.getElementById('rap-progress').style.width = `${genres.rap}%`;
        document.getElementById('rap-progress').setAttribute('aria-valuenow', genres.rap);
        
        document.getElementById('rock-progress').style.width = `${genres.rock}%`;
        document.getElementById('rock-progress').setAttribute('aria-valuenow', genres.rock);
        
        document.getElementById('jazz-progress').style.width = `${genres.jazz}%`;
        document.getElementById('jazz-progress').setAttribute('aria-valuenow', genres.jazz);
        
        document.getElementById('classical-progress').style.width = `${genres.classical}%`;
        document.getElementById('classical-progress').setAttribute('aria-valuenow', genres.classical);
    }

    updateTopGenres(genres) {
        const sortedGenres = Object.entries(genres).sort((a, b) => b[1] - a[1]);
        const topGenresContainer = document.getElementById('top-genres-container');

        const topGenresHTML = `
            <div class="genre-container top-genre" style="background-color: brightblue;">
                <p>${sortedGenres[0][0]}</p>
            </div>
            <div class="genre-container second-genre" style="background-color: darkblue;">
                <p>${sortedGenres[1][0]}</p>
            </div>
            <div class="genre-container third-genre" style="background-color: greyblue;">
                <p>${sortedGenres[2][0]}</p>
            </div>
        `;

        topGenresContainer.innerHTML = topGenresHTML;
    }

    generateFavoriteSongHTML(song) {
        const { title, artist, genre, duration, album } = JSON.parse(song);
        return `
            <div class="row song-row">
                <div class="col-auto"><img src="${album.cover}" alt="Album Cover" style="max-width: 50px;"></div>
                <div class="col" style="font-size: 14px;">${title}</div>
                <div class="col" style="font-size: 14px;">${artist.name}</div>
                <div class="col" style="font-size: 14px;">${genre}</div>
                <div class="col" style="font-size: 14px;">${new Date().toLocaleDateString()}</div>
                <div class="col" style="font-size: 14px;">${Math.floor(duration / 60)}:${duration % 60}</div>
            </div>
        `;
    }

    generateRecentSongHTML(song, index) {
        const { title, artist, album } = JSON.parse(song);
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
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));

        if (!savedSongs || savedSongs.length === 0) {
            return;
        }

        const genreCounts = {};

        savedSongs.forEach(song => {
            const { genre } = JSON.parse(song);
            if (genre in genreCounts) {
                genreCounts[genre]++;
            } else {
                genreCounts[genre] = 1;
            }
        });

        const topGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
        const topGenreElement = document.getElementById('top-genre-placeholder');

        if (topGenres.length === 0) {
            topGenreElement.innerText = "Unknown";
        } else if (topGenres.length === 1) {
            topGenreElement.innerText = topGenres[0];
        } else {
            topGenreElement.innerText = topGenres.join(' & ');
        }
    }
}