import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";

export class AppHeader extends LitElement {
  @state() darkMode = false;

  static styles = css`
    :host {
      display: block;
    }

    header {
      background: var(--color-header-bg);
      color: var(--color-header-text);
      padding: 12px 16px;
      border-bottom: 2px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-family: var(--font-display);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 0.95rem;
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    button {
      padding: 8px 16px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.9;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Check if dark mode was previously enabled
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      this.darkMode = true;
      document.body.classList.add("dark-mode");
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }

  signOut() {
    localStorage.removeItem("mu:auth:jwt");
    
    window.location.assign("/login.html");
  }

  render() {
    return html`
      <header>
        <div class="header-left">
          <h1>Listeners</h1>
        </div>
        <div class="header-right">
          <label>
            <input
              type="checkbox"
              .checked=${this.darkMode}
              @change=${this.toggleDarkMode}
            />
            Dark mode
          </label>
          <button @click=${this.signOut}>Sign Out</button>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);