import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
        <!-- Additional container row for recent songs -->
        <div class="container-fluid bg-grey rounded p-3 text-white mt-4 recent-songs-container" id="recent-songs-container">
        <h2>Recent Songs You Added</h2>

        <div class="row gy-4">
                <!-- Recent songs will be loaded here -->
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
           
        `;
    }

    async loadFavSongs() {
        console.log("I am loading saved songs");
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const favoriteContainer = document.getElementById('favorite-songs-container');
        const recentContainer = document.querySelector('#recent-songs-container .row');

        if (!savedSongs || savedSongs.length === 0) {
            favoriteContainer.innerHTML = `<p>No favorite songs added yet.</p>`;
            recentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            return;
        }

        favoriteContainer.innerHTML = savedSongs.map(song => this.generateFavoriteSongHTML(song)).join('');

        // Sort the songs by date added in descending order
        savedSongs.sort((a, b) => new Date(JSON.parse(b).addedTime) - new Date(JSON.parse(a).addedTime));

        // Take the last 5 most recently added songs
        const recentSongs = savedSongs.slice(-5).reverse(); // Reverse to show the latest added on the left

        // Generate HTML for each recent song and populate the container
        recentContainer.innerHTML = recentSongs.map((song, index) => this.generateRecentSongHTML(song, index)).join('');
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
}