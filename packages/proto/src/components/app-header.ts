import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  @property() title = "Listeners";
  @state() private initiallyChecked = false;

  connectedCallback() {
    super.connectedCallback();
    this.initiallyChecked = document.body.classList.contains("dark-mode");
  }

  render() {
    return html`
      <header>
        <div class="header-center">${this.title}</div>
        <label class="mode-switch">
          <input
            type="checkbox"
            autocomplete="off"
            .checked=${this.initiallyChecked}
          />
          Dark mode
        </label>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);