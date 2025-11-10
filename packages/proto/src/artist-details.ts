import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class ArtistDetails extends LitElement {
  // Keep styling from page.css by using light DOM:
  protected createRenderRoot() { return this; }

  @property() name: string = "";
  @property() genres: string = "";
  @property() country: string = "";

  override render() {
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