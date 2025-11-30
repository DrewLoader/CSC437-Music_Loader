import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class PlaylistDetails extends LitElement {
  @property() name: string = "";
  @property() ownerName: string = "";
  @property() ownerHref: string = "";
  @property() visibility: string = "";
  @property() created: string = "";
  @property() description: string = "";

  static styles = css`
    :host {
      display: block;
    }

    dl {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 8px 24px;
      margin: 0;
      padding: 0;
      max-width: 600px;
      margin: 0 auto;
    }
    
    dt {
      margin: 0;
      font-weight: 600;
      color: var(--color-accent);
      text-align: right;
      padding: 4px 0;
    }
    
    dd {
      margin: 0;
      text-align: left;
      padding: 4px 0;
    }

    a {
      color: var(--color-link);
      text-decoration: none;
      font-weight: 500;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  override render() {
    return html`
      <dl>
        <dt>Name</dt>
        <dd>${this.name}</dd>

        <dt>Owner</dt>
        <dd>
          ${this.ownerHref
            ? html`<a href="${this.ownerHref}">${this.ownerName}</a>`
            : this.ownerName}
        </dd>

        <dt>Visibility</dt>
        <dd>${this.visibility}</dd>
        
        <dt>Created</dt>
        <dd>${this.created}</dd>
        
        <dt>Description</dt>
        <dd>${this.description}</dd>
      </dl>
    `;
  }
}

customElements.define('playlist-details', PlaylistDetails);