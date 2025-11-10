import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class UserFollowing extends LitElement {
  @property() name: string = "";
  @property() href: string = "#";

  protected createRenderRoot() { return this; }

  override render() {
    return html`<li><a href="${this.href}">${this.name}</a></li>`;
  }
}

customElements.define('user-following', UserFollowing);