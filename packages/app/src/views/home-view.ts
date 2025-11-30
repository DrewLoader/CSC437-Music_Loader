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
      margin: 0 0 16px 0;
    }

    .create-button {
      padding: 12px 24px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 24px;
    }

    .create-button:hover {
      opacity: 0.9;
    }

    section {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
    }

    .playlist-item {
      display: block;
      padding: 16px 20px;
      margin-bottom: 12px;
      border: 2px solid var(--color-border);
      border-radius: 8px;
      text-decoration: none;
      color: var(--color-text);
      background: var(--color-surface);
    }

    .playlist-item:hover {
      border-color: var(--color-accent);
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

    .empty-state {
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
    const hasPlaylists = this.playlists.length > 0;

    return html`
      <h1>${this.username}'s Playlists</h1>
      <a href="/app/playlist/new" class="create-button">
        + Create Playlist
      </a>
      <section>
        ${hasPlaylists
          ? this.playlists.map(p => html`
              <a href="/app/playlist/${encodeURIComponent(p.name)}" class="playlist-item">
                <div class="playlist-name">${p.name}</div>
                <div class="playlist-meta">
                  ${p.visibility} • ${p.tracks.length} track${p.tracks.length !== 1 ? 's' : ''}
                </div>
              </a>
            `)
          : html`
              <div class="empty-state">
                <p>No playlists yet. Create your first playlist!</p>
              </div>
            `
        }
      </section>
    `;
  }
}

define({
  "home-view": HomeViewElement
});