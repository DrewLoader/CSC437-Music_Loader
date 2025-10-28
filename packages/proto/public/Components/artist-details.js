import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class ArtistDetails extends LitElement {
  static properties = {
    name:    { type: String },
    genres:  { type: String },
    country: { type: String }
  };

  constructor() {
    super();
    this.name = '';
    this.genres = '';
    this.country = '';
  }


  createRenderRoot() { return this; }

  render() {
    return html`
      <section>
        <h2>
            <svg class="icon"><use href="/icons/music.svg#icon-microphone" /></svg>
            Artist
        </h2>
        <dl class="two">
          <dt>Name</dt><dd>${this.name}</dd>
          <dt>Genres</dt><dd>${this.genres}</dd>
          <dt>Country</dt><dd>${this.country}</dd>
        </dl>
      </section>
    `;
  }
}

customElements.define('artist-details', ArtistDetails);