import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import "./components/app-header";
import "./views/playlist-view";     
import "./views/home-view";        

const routes: Switch.Route[] = [
  {
    path: "/app/playlist/:name",
    view: (params) =>
      html`<playlist-view src=${`/api/playlists/${encodeURIComponent(params.name)}`}></playlist-view>`
  },
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  { path: "/", redirect: "/app" }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class extends Switch.Element {
    constructor() { super(routes, "music:history", "music:auth"); }
  },
  "app-header": customElements.get("app-header")!
});