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
                    <div class="col text-center">
                        <a href="/posts" data-link class="btn btn-primary">View recent songs you added</a>
                    </div>
                </div>
        `;
    }
}