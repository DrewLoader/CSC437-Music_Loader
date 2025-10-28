import { LitElement, html } from 'https://unpkg.com/lit@3/index.js?module';

export class PlaylistDetails extends LitElement {
  static properties = {
    name:        { type: String },
    ownerName:   { type: String },
    ownerHref:   { type: String },
    visibility:  { type: String },
    created:     { type: String },
    description: { type: String }
  };

  constructor() {
    super();
    this.name = '';
    this.ownerName = '';
    this.ownerHref = '';
    this.visibility = '';
    this.created = '';
    this.description = '';
  }


  createRenderRoot() { return this; }

  render() {
    return html`
      <dl class="two">
        <dt>Name</dt><dd>${this.name}</dd>
        <dt>Owner</dt>
        <dd>
          ${this.ownerHref
            ? html`<a href="${this.ownerHref}">${this.ownerName}</a>`
            : this.ownerName}
        </dd>
        <dt>Visibility</dt><dd>${this.visibility}</dd>
        <dt>Created</dt><dd>${this.created}</dd>
        <dt>Description</dt><dd>${this.description}</dd>
      </dl>
    `;
  }
}

customElements.define('playlist-details', PlaylistDetails);