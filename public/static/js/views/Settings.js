
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Add New Songs</h1>
            <p>Here you can add new songs to track your taste in music!</p>
            
            <div class="row mt-4">
                <div class="col text-left">
                    <a href="/posts" data-link class="btn btn-primary">View recent songs you added</a>
                </div>
            </div>

            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search for a song..." />
                <select id="order-select">
                    <option value="RANKING">Ranking</option>
                    <option value="TRACK_ASC">Track Ascending</option>
                    <option value="TRACK_DESC">Track Descending</option>
                    <option value="ARTIST_ASC">Artist Ascending</option>
                    <option value="ARTIST_DESC">Artist Descending</option>
                    <option value="ALBUM_ASC">Album Ascending</option>
                    <option value="ALBUM_DESC">Album Descending</option>
                    <option value="RATING_ASC">Rating Ascending</option>
                    <option value="RATING_DESC">Rating Descending</option>
                    <option value="DURATION_ASC">Duration Ascending</option>
                    <option value="DURATION_DESC">Duration Descending</option>
                </select>
                <button id="search-button" class="btn btn-primary">Search</button>
            </div>

            <div id="song-details" class="song-details hidden">
                <img id="song-cover" src="" alt="Album Cover" />
                <p id="song-name" class="song-name"></p>
                <p id="song-artist" class="song-artist"></p>
                <p id="song-duration" class="song-duration"></p>
                <button id="add-song-button" class="btn btn-success">Add Song to My Favorite Anthems</button>
            </div>
        `;
    }
    
    async searchSong(query) {
        console.log("i entered")
        const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${encodeURIComponent(query)}"`;
        console.log(url);
        try {
            console.log("I AM FETCHING");
            const response = await fetch(url)
            const data = await response.json();
            if (data && Array.isArray(data.data) && data.data.length > 0) {
                const song = data.data[0];
                this.displaySongDetails(song);
            } else {
                alert("No songs found.");
            }
            console.log(data);
        } catch (error) {
            console.error('Error fetching song data:', error);
        }
    }

    async loadScript() {
        console.log("I AM INSIDE LOAD SCript");
        document.getElementById('search-button').addEventListener('click', async () => {
            const query = document.getElementById('search-input').value;
            console.log(query);
            // const order = document.getElementById('order-select').value;
            // console.log(order);
            if (query) {
                console.log("I AM ABOUT TO SEARCH");
                await this.searchSong(query);
            }
        });
    }

    displaySongDetails(song) {
        const songDetails = document.getElementById('song-details');
        document.getElementById('song-cover').src = song.album.cover_big;
        document.getElementById('song-name').textContent = song.title;
        document.getElementById('song-artist').textContent = song.artist.name;
        document.getElementById('song-duration').textContent = `Duration: ${Math.floor(song.duration / 60)}:${song.duration % 60}`;

        songDetails.classList.remove('hidden');

        document.getElementById('add-song-button').addEventListener('click', () => {
            this.addSongToFavorites(song);
        });
    }

    addSongToFavorites(song) {
        console.log('Adding song to favorites:', song);
        alert(`Added ${song.title} by ${song.artist.name} to My Favorite Anthems.`);
    }
}