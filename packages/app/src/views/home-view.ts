import { LitElement, html } from "lit";

export class HomeView extends LitElement {
  createRenderRoot() { return this; }
  render() {
    return html`
      <section>
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-playlist" /></svg>
          Welcome
        </h2>
        <p>Try <a href="/app/playlist/Country">Country</a></p>
      </section>
    `;
  }
}
customElements.define("home-view", HomeView);