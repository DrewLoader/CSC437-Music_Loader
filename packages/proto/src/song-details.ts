import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class SongDetails extends LitElement {
  @property() title: string = "";
  @property({ attribute: "artist-name" }) artistName: string = "";
  @property({ attribute: "artist-href" }) artistHref: string = "";
  @property() album: string = "";
  @property() duration: string = "";
  @property() bpm: string = "";

  protected createRenderRoot() { return this; }

  override render() {
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