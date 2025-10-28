import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class PlaylistSongs extends LitElement {
  @property() title: string = "";
  @property() href: string = "#";
  @property() added: string = "";

  protected createRenderRoot() { return this; }

  override render() {
    return html`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <a href="${this.href}">${this.title}</a>
        ${this.added ? html`<small>added ${this.added}</small>` : ""}
      </li>
    `;
  }
}