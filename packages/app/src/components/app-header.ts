import { LitElement, html } from "lit";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <header>
        <div class="header-center">Music</div>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/playlist/Country">Country</a>
        </nav>
        <label class="mode-switch">
          <input id="dm" type="checkbox" autocomplete="off" />
          Dark mode
        </label>
      </header>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const body = document.body;
    const box = this.querySelector<HTMLInputElement>("#dm");
    if (!box) return;

    box.addEventListener("change", (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      body.classList.toggle("dark-mode", checked);
    });
  }
}

customElements.define("app-header", AppHeader);