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
                <p id="genres" class="genres"></p>
                <p id="release-date" class="release-date"></p>
                <p id="deezer-rank" class="deezer-rank"></p>
                <p id="explicit-lyrics" class="explicit-lyrics"></p>
                <button id="add-song-button" class="btn btn-success">Add Song to My Favorite Anthems</button>
            </div>
        `;
    }

    async getMainGenre(albumId) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}`;
        try {
            const response = await fetch(url);
            const album = await response.json();
            if (album) {
                const genre = album.genres.data[0].name;
                const releaseDate = album.release_date;
                return { genre, releaseDate };
            } else {
                throw new Error("Couldn't find such album");
            }
        } catch (error) {
            console.error('Error fetching album data:', error);
        }
    }
    
    async searchSong(query) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${encodeURIComponent(query)}"`;
        try {
            const response = await fetch(url)
            const data = await response.json();
            if (data && Array.isArray(data.data) && data.data.length > 0) {
                var song = data.data[0];
                const albumId = song.album.id;
                const { genre, releaseDate } = await this.getMainGenre(albumId);
                song.genre = genre;
                song.release_date = releaseDate;
                this.displaySongDetails(song);
            } else {
                alert("No songs found.");
            }
        } catch (error) {
            console.error('Error fetching song data:', error);
        }
    }

    async loadScript() {
        document.getElementById('search-button').addEventListener('click', async () => {
            const query = document.getElementById('search-input').value;
            if (query) {
                await this.searchSong(query);
            }
        });
    }

    displaySongDetails(song) {
        const songDetails = document.getElementById('song-details');
        document.getElementById('song-cover').src = song.album.cover_big;
        document.getElementById('song-name').textContent = song.title;
        document.getElementById('song-artist').textContent = `Artist: ${song.artist.name}`;
        document.getElementById('song-duration').textContent = `Duration: ${Math.floor(song.duration / 60)}:${song.duration % 60}`;
        document.getElementById('genres').textContent = `Genre: ${song.genre}`;
        document.getElementById('release-date').textContent = song.release_date ? `Release Date: ${song.release_date}` : 'Release Date: Unknown';
    
        // Display Deezer rank and explicit lyrics information
        const deezerRank = song.rank || 'N/A';
        const explicitLyrics = this.getExplicitLyricsDescription(song.explicit_content_lyrics);
        document.getElementById('deezer-rank').textContent = `Deezer Rank: ${deezerRank}`;
        document.getElementById('explicit-lyrics').textContent = `Explicit Content Lyrics: ${explicitLyrics}`;
    
        songDetails.classList.remove('hidden');
    
        document.getElementById('add-song-button').addEventListener('click', () => {
            this.addSongToFavorites(song);
        });
    }

    getExplicitLyricsDescription(explicitContentLyrics) {
        switch (explicitContentLyrics) {
            case 0:
                return "Not Explicit";
            case 1:
                return "Explicit";
            case 2:
                return "Unknown";
            case 3:
                return "Edited";
            case 4:
                return "Partially Explicit (Album 'lyrics' only)";
            case 5:
                return "Partially Unknown (Album 'lyrics' only)";
            case 6:
                return "No Advice Available";
            case 7:
                return "Partially No Advice Available (Album 'lyrics' only)";
            default:
                return "Unknown";
        }
    }

    addSongToFavorites(song) {
        const addedTime = Date.now();
        var savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        if (savedSongs === null || savedSongs.length === 0) {
            savedSongs = [];  
        }
        var thisSongIsAdded = false; 
        savedSongs.map((songJson, index) => {
            const parsedSong = JSON.parse(songJson);
            if (song.id === parsedSong.id) {
                thisSongIsAdded = true;
            }
        });
        if (thisSongIsAdded) {
            alert(`This song is already added`);
        } else {
            song.addedTime = addedTime;
            savedSongs.push(JSON.stringify(song));
            localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
            alert(`Added ${song.title} by ${song.artist.name} to My Favorite Anthems. Added at ${new Date(addedTime)}`);
        }

    }
}