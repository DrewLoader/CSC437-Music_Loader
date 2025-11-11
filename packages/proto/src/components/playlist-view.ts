import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, Observer } from '@calpoly/mustang';
import '../playlist-details';
import '../playlist-songs';

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
  createRenderRoot() { return this; }

  @property() src?: string;

  @state() private details?: PlaylistDetails;
  @state() private tracks: Track[] = [];

  private _auth = new Observer<Auth.Model>(this, "music:auth");
  private _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._auth.observe((auth) => { (this._user = auth.user); });
    if (this.src) this.hydrate(this.src);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('src') && this.src) {
      this.hydrate(this.src);
    }
  }

  private get authorization():
    | Record<string, string>
    | undefined {
      return this._user?.authenticated
        ? { Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`, }
        : undefined;
  }

  hydrate(src: string) {
    const init: RequestInit = { headers: this.authorization };
    fetch(src, init)
      .then((res) => {
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
          <h2>
            <svg class="icon"><use href="/icons/music.svg#icon-playlist"></use></svg>
            Details
          </h2>
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
        <h2>
          <svg class="icon"><use href="/icons/music.svg#icon-record"></use></svg>
          Tracks
        </h2>
        <ul class="list">
          ${this.tracks.map(t => html`
            <playlist-songs title=${t.title} href=${t.href} added=${t.added ?? ''}></playlist-songs>
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
    tracks: okTracks.map(t => ({ title: String(t.title), href: String(t.href), added: t.added ? String(t.added) : undefined }))
  };
}