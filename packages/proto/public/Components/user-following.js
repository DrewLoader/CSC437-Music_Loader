import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class UserFollowing extends LitElement {
  static properties = {
    name: { type: String },
    href: { type: String },
  };

  constructor() {
    super();
    this.name = '';
    this.href = '#';
  }


  createRenderRoot() { return this; }

  render() {
    return html`<li><a href="${this.href}">${this.name}</a></li>`;
  }
}

customElements.define('user-following', MusicArtistItem);