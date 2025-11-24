import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html } from "lit";


import "./components/app-header";
import "./components/playlist-view";

const routes = [
  {
    path: "/app/playlists/:name",
    view: (params: Switch.Params) => html`
      <playlist-view src=${`/api/playlists/${encodeURIComponent(params.name)}`}></playlist-view>
    `
  },
  {
    path: "/app",
    view: () => html`<p>Welcome to Music Loader.</p>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "music:history", "music:auth");
    }
  }
});