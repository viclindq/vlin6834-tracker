import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1>My Favorite Anthems</h1>
            <p>You are viewing the songs you saved!</p>
        `;
    }
} 