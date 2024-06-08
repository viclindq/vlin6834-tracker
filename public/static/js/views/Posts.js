import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <!-- Additional container row for recent songs -->
            <div class="row mt-2"> <!-- Adjusted margin-top -->
                <h2>Recent Songs You Added</h2>
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
        const container = document.getElementById('favorite-songs-container');

        if (!savedSongs || savedSongs.length === 0) {
            container.innerHTML = `<p>No favorite songs added yet.</p>`;
            return;
        }

        container.innerHTML = savedSongs.map(song => this.generateSongHTML(song)).join('');
    }

    generateSongHTML(song) {
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
}