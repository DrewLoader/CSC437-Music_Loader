import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class PlaylistSongs extends LitElement {
  @property() title: string = "";
  @property() href: string = "#";
  @property() added: string = "";

  static styles = css`
    :host {
      display: contents;
    }

    li {
      display: flex;
      align-items: center;
      gap: 16px;
      background: transparent;
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 12px;
      list-style: none;
    }

    svg.icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      fill: currentColor;
    }

    .track-title {
      flex: 1;
      color: var(--color-text);
      font-weight: 500;
      font-size: 1rem;
    }

    small {
      color: #666;
      font-size: 0.875rem;
      white-space: nowrap;
    }
  `;

  override render() {
    return html`
      <li>
        <svg class="icon" aria-hidden="true">
          <use href="/icons/music.svg#icon-record"></use>
        </svg>
        <span class="track-title">${this.title}</span>
        ${this.added ? html`<small>Added ${this.added}</small>` : ""}
      </li>
    `;
  }
}

customElements.define('playlist-songs', PlaylistSongs);