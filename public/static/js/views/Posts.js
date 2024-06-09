import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
        window.deleteSong = this.deleteSong.bind(this); // Attach to the global scope
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
                <div class="col-auto">Clear</div>
            </div>
            <div class="row gy-4" id="favorite-songs-container">
                <!-- Favorite songs will be loaded here -->
            </div>
        </div>
        `;
    }

    async loadFavSongs() {
        console.log("Loading saved songs");
        const savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
        const favoriteContainer = document.getElementById('favorite-songs-container');
        const recentContainer = document.querySelector('#recent-songs-container .row');

        if (!savedSongs || savedSongs.length === 0) {
            favoriteContainer.innerHTML = `<p>No favorite songs added yet.</p>`;
            recentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            const mostRecentContainer = document.getElementById('most-recent-song-container');
            if (mostRecentContainer) {
                mostRecentContainer.innerHTML = `<p>No recent songs added yet.</p>`;
            }
            return;
        }

        favoriteContainer.innerHTML = savedSongs.map(song => this.generateFavoriteSongHTML(song)).join('');

        const repeatList = Math.min(5, savedSongs.length);
        const dummyList = Array.from(Array(repeatList).keys());
        recentContainer.innerHTML = dummyList.map((song, index) => this.generateRecentSongHTML(index)).join('');

        const mostRecentContainer = document.getElementById('most-recent-song-container');
        if (mostRecentContainer) {
            const mostRecentSong = JSON.parse(savedSongs[0]);
            mostRecentContainer.innerHTML = this.generateRecentSongHTML(0);
        }
    }

    generateFavoriteSongHTML(song) {
        const { id, title, artist, genre, duration, album, addedTime } = JSON.parse(song);
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
    async deleteSong(songId) {
        const confirmation = confirm("Are you sure you want to remove this song from your favorite songs?");
        if (confirmation) {
            console.log(`Deleting song with ID: ${songId}`);
            let listOfSongs = JSON.parse(localStorage.getItem('savedSongs'));
            console.log('Original list of songs:', listOfSongs);
            const updatedList = listOfSongs.filter(songJSON => {
                const parsedSong = JSON.parse(songJSON);
                return songId !== parsedSong.id;
            });
            console.log('Updated list of songs:', updatedList);
            localStorage.setItem('savedSongs', JSON.stringify(updatedList));
            await this.loadFavSongs(); // Reload the list to reflect the changes
        }
    }
}
