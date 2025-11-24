import { LitElement, html } from "lit";

export class AppHeader extends LitElement {
  protected createRenderRoot() { return this; }

  private _onSwitchChange = (event: Event) => {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement).checked;
    (event.currentTarget as HTMLLabelElement).dispatchEvent(
      new CustomEvent("darkmode:toggle", {
        bubbles: true,
        composed: true,
        detail: { checked }
      })
    );
  };

  private _onDarkmode = (e: Event) => {
    const checked = (e as CustomEvent).detail?.checked;
    document.body.classList.toggle("dark-mode", !!checked);
  };

  connectedCallback() {
    super.connectedCallback();

    const switchLabel = this.querySelector<HTMLLabelElement>("label.mode-switch");

    if (switchLabel) {
      switchLabel.addEventListener("change", this._onSwitchChange);
      document.body.addEventListener("darkmode:toggle", this._onDarkmode);
    }
  }

  disconnectedCallback() {
    const switchLabel = this.querySelector<HTMLLabelElement>("label.mode-switch");
    if (switchLabel) switchLabel.removeEventListener("change", this._onSwitchChange);
    document.body.removeEventListener("darkmode:toggle", this._onDarkmode);
    super.disconnectedCallback();
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