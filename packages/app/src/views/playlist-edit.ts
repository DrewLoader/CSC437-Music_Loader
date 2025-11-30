import { define, Form, View, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { PlaylistView } from "server/models";
import { Msg } from "../message";
import { Model } from "../model";

export class PlaylistEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

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
    }

    label {
      display: grid;
      gap: 4px;
      margin-bottom: 16px;
    }

    label span {
      font-weight: 600;
      color: var(--color-accent);
    }

    input, textarea {
      padding: 8px 12px;
      border: 2px solid var(--color-border);
      border-radius: 4px;
      font-size: 1rem;
      background: var(--color-surface);
      color: var(--color-text);
      font-family: var(--font-sans);
    }

    textarea {
      min-height: 100px;
      resize: vertical;
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
      this.dispatchMessage([
        "playlist/request",
        { name: newValue }
      ]);
    }
  }

  render() {
    const { playlist } = this;

    if (!playlist) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <section>
        <h2>Edit Playlist</h2>
        <mu-form
          .init=${playlist}
          @mu-form:submit=${this._handleSubmit}
        >
          <label>
            <span>Visibility</span>
            <input name="visibility" value=${playlist.visibility} />
          </label>
          <label>
            <span>Description</span>
            <textarea name="description">${playlist.description}</textarea>
          </label>
        </mu-form>
      </section>
    `;
  }

  _handleSubmit(event: Form.SubmitEvent<PlaylistView>) {
    this.dispatchMessage([
      "playlist/save",
      {
        name: this.playlistName!,
        playlist: event.detail
      },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/playlist/${this.playlistName}`
          }),
        onFailure: (error: Error) =>
          console.error("ERROR:", error)
      }
    ]);
  }
}

define({
  "playlist-edit": PlaylistEditElement
});