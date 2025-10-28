import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class PlaylistDetails extends LitElement {
  @property() name: string = "";
  @property() ownerName: string = "";
  @property() ownerHref: string = "";
  @property() visibility: string = "";
  @property() created: string = "";
  @property() description: string = "";


  protected createRenderRoot() { return this; }

  override render() {
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