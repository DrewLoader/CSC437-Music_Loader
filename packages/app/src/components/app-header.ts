// app/src/components/app-header.ts
import { LitElement, html } from "lit";

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  connectedCallback() {
    super.connectedCallback();
    const checkbox = this.querySelector('label.mode-switch input[type="checkbox"]') as HTMLInputElement | null;
    if (checkbox) {
      checkbox.addEventListener("change", (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        document.body.classList.toggle("dark-mode", !!checked);
      });
    }
  }

  render() {
    return html`
      <header>
        <div class="header-center">Listeners</div>
        <label class="mode-switch">
          <input type="checkbox" autocomplete="off" />
          Dark mode
        </label>
      </header>
    `;
  }
}
customElements.define("app-header", AppHeader);