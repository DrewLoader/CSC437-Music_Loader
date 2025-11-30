import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { PlaylistView } from "server/models";
import { Msg } from "../message";
import { Model } from "../model";
import "../components/playlist-details";
import "../components/playlist-songs";
import "../components/track-view";

export class PlaylistViewElement extends View<Model, Msg> {
  @property({ attribute: "playlist-name" })
  playlistName?: string;

  @state()
  get playlist(): PlaylistView | undefined {
    return this.model.playlist;
  }

  static styles = css`
    :host {
      display: block;
      padding: 24px 16px;
      max-width: 1000px;
      margin: 0 auto;
    }

    section {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--color-border);
    }

    .section-header svg {
      width: 32px;
      height: 32px;
      fill: var(--color-accent);
    }

    .section-header h2 {
      margin: 0;
      color: var(--color-accent);
      font-family: var(--font-display);
      font-size: 1.75rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `;

  constructor() {
    super("music:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "playlist-name" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Requesting playlist:", newValue);
      this.dispatchMessage([
        "playlist/request",
        { name: newValue }
      ]);
    }
  }

  render() {
    const { playlist, playlistName } = this;

    if (!playlist) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <section id="details">
        <div class="section-header">
          <svg class="icon">
            <use href="/icons/music.svg#icon-playlist"></use>
          </svg>
          <h2>Details</h2>
        </div>
        <playlist-details
          name=${playlist.name}
          ownerName=${playlist.ownerName}
          ownerHref=${playlist.ownerHref ?? ''}
          visibility=${playlist.visibility}
          created=${playlist.created}
          description=${playlist.description}
        ></playlist-details>
      </section>

      <section id="tracks">
        <div class="section-header">
          <svg class="icon">
            <use href="/icons/music.svg#icon-record"></use>
          </svg>
          <h2>Tracks</h2>
        </div>
        <ul>
          ${playlist.tracks.map(t => html`
            <playlist-songs 
              title=${t.title} 
              href=${t.href} 
              added=${t.added ?? ''}
            ></playlist-songs>
          `)}
        </ul>
      </section>

      <section id="add-track">
        <div class="section-header">
          <svg class="icon">
            <use href="/icons/music.svg#icon-record"></use>
          </svg>
          <h2>New Track</h2>
        </div>
        <track-form playlistName=${playlistName}></track-form>
      </section>
    `;
  }
}

define({
  "playlist-view": PlaylistViewElement
});