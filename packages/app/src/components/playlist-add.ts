import { define, Form, View, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { PlaylistView } from "server/models";
import { Msg } from "../message";
import { Model } from "../model";

export class PlaylistCreateFormElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property()
  username?: string;

  static styles = css`
    :host {
      display: block;
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

    input, select, textarea {
      padding: 8px 12px;
      border: 2px solid var(--color-border);
      border-radius: 4px;
      font-size: 1rem;
      background: var(--color-surface);
      color: var(--color-text);
      font-family: var(--font-sans);
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }
  `;

  constructor() {
    super("music:model");
  }

  render() {
    return html`
      <mu-form 
        .init=${this.init} 
        @mu-form:submit=${this._handleSubmit}
      >
        <label>
          <span>Playlist Name</span>
          <input name="name" required placeholder="My Awesome Playlist" />
        </label>
        <label>
          <span>Visibility</span>
          <select name="visibility" required>
            <option value="Public">Public</option>
            <option value="Private" selected>Private</option>
          </select>
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" placeholder="What's this playlist about?"></textarea>
        </label>
      </mu-form>
    `;
  }

  get init(): Partial<PlaylistView> {
    return {
      name: "",
      ownerName: this.username || "",
      visibility: "Private",
      description: "",
      created: new Date().toISOString().split('T')[0],
      tracks: []
    };
  }

  _handleSubmit(event: Form.SubmitEvent<PlaylistView>) {
    const formData = event.detail;
    
    const playlist: PlaylistView = {
      name: formData.name,
      ownerName: this.username || formData.ownerName || "",
      ownerHref: `/listener-${this.username?.toLowerCase()}.html`,
      visibility: formData.visibility,
      created: new Date().toISOString().split('T')[0],
      description: formData.description || "",
      tracks: []
    };

    console.log("Submitting playlist:", playlist);

    this.dispatchMessage([
      "playlist/create",
      { playlist },
      {
        onSuccess: () => {
          console.log("Playlist created successfully, navigating...");
          setTimeout(() => {
            History.dispatch(this, "history/navigate", {
              href: `/app/playlist/${encodeURIComponent(playlist.name)}`
            });
          }, 100);
        },
        onFailure: (error: Error) => {
          console.error("Failed to create playlist:", error);
          alert(`Failed to create playlist: ${error.message}`);
        }
      }
    ]);
  }
}

define({
  "playlist-create-form": PlaylistCreateFormElement
});