import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class PlaylistSongs extends LitElement {
  static properties = {
    title: { type: String },   
    href:  { type: String },   
    added: { type: String }
  };

  constructor() {
    super();
    this.title = '';
    this.href = '#';
    this.added = '';
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
        ${this.added ? html`<small>added ${this.added}</small>` : ''}
      </li>
    `;
  }
}

customElements.define('playlist-songs', PlaylistSongs);