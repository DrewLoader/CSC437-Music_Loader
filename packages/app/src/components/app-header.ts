import { LitElement, html } from "lit";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <header>
        <div class="header-center">Music</div>
        <label class="mode-switch">
          <input id="dark-toggle" type="checkbox" autocomplete="off" />
          Dark mode
        </label>
      </header>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    const checkbox =
      this.querySelector<HTMLInputElement>('#dark-toggle');

    if (checkbox) {
      // Restore persisted choice (optional)
      const saved = localStorage.getItem("dark-mode") === "true";
      document.body.classList.toggle("dark-mode", saved);
      checkbox.checked = saved;

      checkbox.addEventListener("change", () => {
        const on = checkbox.checked;
        document.body.classList.toggle("dark-mode", on);
        localStorage.setItem("dark-mode", String(on));
      });
    }
  }
}

customElements.define("app-header", AppHeader);