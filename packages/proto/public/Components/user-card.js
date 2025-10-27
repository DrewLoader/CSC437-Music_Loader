import { LitElement, html } from 'lit';

export class UserCard extends LitElement {
    static properties = {
        id: { type: String },
        region: { type: String },
        since: { type: String },
        email: { type: String },
    };

    constructor() {
        super();
        this.id = '';
        this.region = '';
        this.since = '';
        this.email = '';
    }
    
    createRenderRoot() { return this; }

    render() {
        return html`
            <section id = "profile">
                <h2>
                    <svg class="icon"><use href="/icons/music.svg#icon-headphone" /></svg>
                    Profile
                </h2>
                <ul class ="list">
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