import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export class UserCard extends LitElement {
  @property({ attribute: "user-id" }) userId: string = "";
  @property() region: string = "";
  @property() since: string = "";
  @property() email: string = "";

  protected createRenderRoot() { return this; }

  override render() {
    return html`
      <section id="profile">
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-headphone"></use></svg>
          Profile
        </h2>
        <ul class="list">
          <li>ID: ${this.userId}</li>
          <li>Region: ${this.region}</li>
          <li>Member since: ${this.since}</li>
          <li>Email: ${this.email}</li>
        </ul>
      </section>
    `;
  }
}

customElements.define('user-card', UserCard);