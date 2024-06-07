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
                <div class="row mt-4">
                    <div class="col text-center">
                        <a href="/posts" data-link class="btn btn-primary">View recent songs you added</a>
                    </div>
                </div>
            </div>
        `;
    }
}