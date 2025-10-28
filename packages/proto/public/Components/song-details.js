import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class SongDetails extends LitElement {
  static properties = {
    title:      { type: String },
    artistName: { type: String },
    artistHref: { type: String },
    album:      { type: String },
    duration:   { type: String },
    bpm:        { type: String },
  };

  constructor() {
    super();
    this.title = '';
    this.artistName = '';
    this.artistHref = '';
    this.album = '';
    this.duration = '';
    this.bpm = '';
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <dl class="two">
        <dt>Title</dt><dd>${this.title}</dd>
        <dt>Artist</dt>
        <dd>
          ${this.artistHref
            ? html`<a href="${this.artistHref}">${this.artistName}</a>`
            : this.artistName}
        </dd>
        <dt>Album</dt><dd>${this.album}</dd>
        <dt>Duration</dt><dd>${this.duration}</dd>
        <dt>BPM</dt><dd>${this.bpm}</dd>
      </dl>
    `;
  }
}

customElements.define('song-details', SongDetails);