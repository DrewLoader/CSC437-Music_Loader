import { define, Form, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Track } from "server/models";
import { Msg } from "../message";
import { Model } from "../model";

export class TrackFormElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property()
  playlistName?: string;

  static styles = css`
    :host {
      display: block;
    }

    mu-form {
      display: block;
    }

    form {
      display: grid;
      gap: 16px;
      max-width: 600px;
      margin: 0 auto;
    }

    label {
      display: grid;
      gap: 4px;
    }

    label span {
      font-weight: 600;
      color: var(--color-accent);
    }

    input {
      padding: 8px 12px;
      border: 2px solid var(--color-border);
      border-radius: 4px;
      font-size: 1rem;
      background: var(--color-surface);
      color: var(--color-text);
    }

    button[type="submit"] {
      padding: 12px 24px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    button[type="submit"]:hover {
      opacity: 0.9;
    }
  `;

  constructor() {
    super("music:model");
  }

  render() {
    return html`
      <mu-form .init=${this.init} @mu-form:submit=${this._handleSubmit}>
        <label>
          <span>Track Title</span>
          <input name="title" required />
        </label>
        <label>
          <span>Track URL</span>
          <input name="href" type="url" required />
        </label>
        <button type="submit">Add Track</button>
      </mu-form>
    `;
  }

  get init(): Track {
    return {
      title: "",
      href: "",
      added: new Date().toISOString().split('T')[0]
    };
  }

  _handleSubmit(event: CustomEvent) {
    const track = event.detail as Track;
    
    if (this.playlistName) {
      this.dispatchMessage([
        "track/save",
        { playlistName: this.playlistName, track }
      ]);
    }
  }
}

define({
  "track-form": TrackFormElement
});