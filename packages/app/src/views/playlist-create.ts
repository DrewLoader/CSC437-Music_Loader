import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Msg } from "../message";
import { Model } from "../model";
import "../components/playlist-create-form";

export class PlaylistCreateElement extends View<Model, Msg> {
  @state()
  get username(): string {
    return this.model.username || "User";
  }

  static styles = css`
    :host {
      display: block;
      padding: 24px 16px;
      max-width: 800px;
      margin: 0 auto;
    }

    section {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
    }

    h2 {
      margin: 0 0 24px 0;
      color: var(--color-accent);
      font-family: var(--font-display);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h2 svg {
      width: 32px;
      height: 32px;
      fill: var(--color-accent);
    }
  `;

  constructor() {
    super("music:model");
  }

  render() {
    return html`
      <section>
        <h2>
          <svg class="icon">
            <use href="/icons/music.svg#icon-playlist"></use>
          </svg>
          Create New Playlist
        </h2>
        <playlist-create-form username=${this.username}></playlist-create-form>
      </section>
    `;
  }
}

define({
  "playlist-create": PlaylistCreateElement
});