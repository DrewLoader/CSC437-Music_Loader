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

    label {
      display: grid;
      gap: 4px;
      margin-bottom: 16px;
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
          <span>Track Title</span>
          <input name="title" required placeholder="Enter song name" />
        </label>
      </mu-form>
    `;
  }

  get init(): Track {
    return {
      title: "",
      href: "#",
      added: new Date().toISOString().split('T')[0]
    };
  }

  _handleSubmit(event: CustomEvent) {
    const formData = event.detail as any;
    
    const track: Track = {
      title: formData.title,
      href: "#",
      added: new Date().toISOString().split('T')[0]
    };
    
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