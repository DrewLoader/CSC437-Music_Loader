import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';
class UserPlaylist extends LitElement {
    static properties = {
        name: { type: String },
        href: { type: String},
        visibility: { type: String },
        tracks: { type: Number }
    };

    constructor() {
        super();
        this.name = '';
        this.href = '#';
        this.visibility = '';
        this.tracks = 0;
    }

    createRenderRoot() { return this; }

    render() {
        const trackLabel = this.tracks === 1 ? 'track' : `${this.tracks} tracks`;
        return html`
            <li>
                <svg class="icon" aria-hidden="true">
                <use href="/icons/music.svg#icon-playlist"></use>
                </svg>
                <a href="${this.href}">${this.name}</a>
                <small>${this.visibility}: ${trackLabel}</small>
            </li>
        `;
    }
}

customElements.define('user-playlist', UserPlaylist);