import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class UserPlaylist extends LitElement {
  @property() name: string = "";
  @property() href: string = "#";
  @property() visibility: string = "";
  @property({ type: Number }) tracks: number = 0;

  protected createRenderRoot() { return this; }

  override render() {
    const trackLabel = this.tracks === 1 ? "1 track" : `${this.tracks} tracks`;
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