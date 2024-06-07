import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <div class="row mt-4">
            <h1>Add New Songs</h1>
            <p>Here you can add new songs to track your taste in music!</p>
                <div class="col">
                    <input type="text" id="song-search-input" placeholder="Search for a song...">
                    <button id="search-btn" class="btn btn-primary">Search</button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-6">
                    <select id="song-selection-menu" class="form-select" size="5">
                        <!-- Populate this dropdown with search results -->
                    </select>
                </div>
                <div class="col-6">
                    <div id="selected-song-container" class="text-center">
                        <!-- Show selected song details here -->
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col text-start">
                    <a href="/posts" data-link class="btn btn-primary">View recent songs you added</a>
                </div>
            </div>
        `;
    }

    async onRender() {
        // Add event listener for the search button
        document.getElementById('search-btn').addEventListener('click', this.searchSong);
    }

    async searchSong() {
        // Implement search functionality using the Spotify API
        // Display search results in the song selection menu
    }
}