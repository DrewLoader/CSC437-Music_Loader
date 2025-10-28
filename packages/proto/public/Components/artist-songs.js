import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class ArtistSongs extends LitElement {
  static properties = {
    title: { type: String },   
    href:  { type: String }
  };

  constructor() {
    super();
    this.title = '';
    this.href = '#';
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
      </li>
    `;
  }
}

customElements.define('artist-songs', ArtistSongs);