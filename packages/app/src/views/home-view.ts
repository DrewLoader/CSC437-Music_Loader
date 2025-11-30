import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { PlaylistView } from "server/models";
import { Msg } from "../message";
import { Model } from "../model";

export class HomeViewElement extends View<Model, Msg> {
  @state()
  get playlists(): PlaylistView[] {
    return this.model.playlists || [];
  }

  @state()
  get username(): string {
    return this.model.username || "User";
  }

  static styles = css`
    :host {
      display: block;
      padding: 24px 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: var(--color-accent);
      font-family: var(--font-display);
      font-size: 2rem;
      margin: 0 0 32px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h1 svg {
      width: 40px;
      height: 40px;
      fill: var(--color-accent);
    }

    section {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
    }

    .playlist-list {
      display: grid;
      gap: 16px;
    }

    .playlist-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border: 2px solid var(--color-border);
      border-radius: 8px;
      text-decoration: none;
      color: var(--color-text);
      background: var(--color-surface);
      transition: all 0.2s;
    }

    .playlist-item:hover {
      background: var(--color-bg);
      border-color: var(--color-accent);
    }

    .playlist-item svg {
      width: 32px;
      height: 32px;
      fill: var(--color-accent);
      flex-shrink: 0;
    }

    .playlist-info {
      flex: 1;
    }

    .playlist-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-link);
      margin-bottom: 4px;
    }

    .playlist-meta {
      font-size: 0.9rem;
      color: #666;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `;

  constructor() {
    super("music:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["playlists/request"]);
  }

  render() {
    const { playlists, username } = this;

    if (playlists.length === 0) {
      return html`
        <h1>
          <svg class="icon">
            <use href="/icons/music.svg#icon-playlist"></use>
          </svg>
          ${username}'s Playlists
        </h1>
        <section>
          <p class="loading">Loading playlists...</p>
        </section>
      `;
    }

    return html`
      <h1>
        <svg class="icon">
          <use href="/icons/music.svg#icon-playlist"></use>
        </svg>
        ${username}'s Playlists
      </h1>
      <section>
        <div class="playlist-list">
          ${playlists.map(
            (playlist) => html`
              
                href="/app/playlist/${encodeURIComponent(playlist.name)}"
                class="playlist-item"
              >
                <svg class="icon">
                  <use href="/icons/music.svg#icon-playlist"></use>
                </svg>
                <div class="playlist-info">
                  <div class="playlist-name">${playlist.name}</div>
                  <div class="playlist-meta">
                    ${playlist.visibility} • ${playlist.tracks.length} track${playlist.tracks.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </a>
            `
          )}
        </div>
      </section>
    `;
  }
}

define({
  "home-view": HomeViewElement
});