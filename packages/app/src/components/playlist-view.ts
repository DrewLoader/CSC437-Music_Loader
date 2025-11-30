import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';
import './playlist-details';
import './playlist-songs';

type Track = { title: string; href: string; added?: string };
type PlaylistDetails = {
  name: string;
  ownerName: string;
  ownerHref?: string;
  visibility: string;
  created: string;
  description: string;
};
type PlaylistData = { details: PlaylistDetails; tracks: Track[] };

export class PlaylistView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 24px 16px;
      max-width: 1000px;
      margin: 0 auto;
    }

    section {
      background: var(--color-surface);
      border: 2px solid var(--color-border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--color-border);
    }

    .section-header svg {
      width: 32px;
      height: 32px;
      fill: var(--color-accent);
    }

    .section-header h2 {
      margin: 0;
      color: var(--color-accent);
      font-family: var(--font-display);
      font-size: 1.75rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `;

  @property() src?: string;

  @state() private details?: PlaylistDetails;
  @state() private tracks: Track[] = [];

  private _auth = new Observer<Auth.Model>(this, "music:auth");
  private _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._auth.observe((auth) => { 
      this._user = auth.user;
      console.log("Auth updated:", auth.user);
    });
    if (this.src) this.hydrate(this.src);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('src') && this.src) {
      this.hydrate(this.src);
    }
  }

  private get authorization(): Record<string, string> | undefined {
    if (this._user?.authenticated) {
      return { 
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}` 
      };
    }
    
    const token = localStorage.getItem("mu:auth:jwt");
    if (token) {
      console.log("Using token from localStorage");
      return { Authorization: `Bearer ${token}` };
    }
    
    console.warn("No authentication token found");
    return undefined;
  }

  hydrate(src: string) {
    const headers = this.authorization;
    console.log("Fetching with headers:", headers);
    
    const init: RequestInit = { headers };
    
    fetch(src, init)
      .then((res) => {
        if (res.status === 401) {
          console.error("401 Unauthorized - redirecting to login");
          window.location.assign("/login.html");
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((json: object) => {
        const data = helperPlaylist(json);
        if (!data) throw new Error("Invalid playlist payload");
        this.details = data.details;
        this.tracks = data.tracks;
      })
      .catch((err) => {
        console.error("playlist-view hydrate failed:", err);
        this.details = undefined;
        this.tracks = [];
      });
  }

  render() {
    return html`
      ${this.details ? html`
        <section id="details">
          <div class="section-header">
            <svg class="icon">
              <use href="/icons/music.svg#icon-playlist"></use>
            </svg>
            <h2>Details</h2>
          </div>
          <playlist-details
            name=${this.details.name}
            ownerName=${this.details.ownerName}
            ownerHref=${this.details.ownerHref ?? ''}
            visibility=${this.details.visibility}
            created=${this.details.created}
            description=${this.details.description}
          ></playlist-details>
        </section>` : ''}

      <section id="tracks">
        <div class="section-header">
          <svg class="icon">
            <use href="/icons/music.svg#icon-record"></use>
          </svg>
          <h2>Tracks</h2>
        </div>
        <ul>
          ${this.tracks.map(t => html`
            <playlist-songs 
              title=${t.title} 
              href=${t.href} 
              added=${t.added ?? ''}
            ></playlist-songs>
          `)}
        </ul>
      </section>
    `;
  }
}

customElements.define('playlist-view', PlaylistView);

function helperPlaylist(json: any): PlaylistData | null {
  if (!json || typeof json !== 'object') return null;

  const details: any = json.details ?? json;
  const tracks: any[] = json.tracks ?? [];

  if (!details?.name || !Array.isArray(tracks)) return null;

  const okTracks = tracks.filter(t => t && typeof t.title === 'string' && typeof t.href === 'string');

  return {
    details: {
      name: String(details.name),
      ownerName: String(details.ownerName ?? ''),
      ownerHref: details.ownerHref ? String(details.ownerHref) : undefined,
      visibility: String(details.visibility ?? ''),
      created: String(details.created ?? ''),
      description: String(details.description ?? '')
    },
    tracks: okTracks.map(t => ({ 
      title: String(t.title), 
      href: String(t.href), 
      added: t.added ? String(t.added) : undefined 
    }))
  };
}