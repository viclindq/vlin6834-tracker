export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }

    async loadScripts() {
        return;
    }

    async searchSong(query) {
        return;
    }

    async loadFavSongs() {
        return;
    }

    async deleteSong(songId) {
    }
}
