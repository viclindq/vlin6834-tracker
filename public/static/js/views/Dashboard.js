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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-md-4 adjusted-padding">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Top 3 Genres</h2>
                            <ul>
                                <li>Jazz House</li>
                                <li>Electronic</li>
                                <li>Rock</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4 adjusted-padding">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Most Recent Song</h2>
                            <p>Latest Song: "Song Title"</p>
                            <p>Artist: "Artist Name"</p>
                        </div>
                    </div>
                </div>
                

                <!-- Additional container row for recent songs -->
                <div class="row mt-2">
                    <h2>Recent Songs You Added</h2>
                </div>
                <div class="row gy-4">
                    <div class="col-md-2">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <img src="https://www.udiscovermusic.com/wp-content/uploads/2017/08/Pink-Floyd-Dark-Side-Of-The-Moon.jpg" alt="Album Cover 1">
                            <p class="song-name">Song Name 1</p>
                            <p class="artist">Artist Name 1</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <img src="https://assets-global.website-files.com/5e6a544cadf84b1393e2e022/611cfe2fe8dfe7fe77ba50c4_cri_000000319870%20(1).jpeg" alt="Album Cover 2">
                            <p class="song-name">Song Name 2</p>
                            <p class="artist">Artist Name 2</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <img src="https://www.billboard.com/wp-content/uploads/2023/07/rihanna-anti-cover-2016-billboard-1240.jpg?w=600" alt="Album Cover 3">
                            <p class="song-name">Song Name 3</p>
                            <p class="artist">Artist Name 3</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <img src="https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*" alt="Album Cover 4">
                            <p class="song-name">Song Name 4</p>
                            <p class="artist">Artist Name 4</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <img src="https://www.fubiz.net/wp-content/uploads/2018/01/01-kendrick-lamar-damn-album-art-2017-billboard-1240.jpg" alt="Album Cover 5">
                            <p class="song-name">Song Name 5</p>
                            <p class="artist">Artist Name 5</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}