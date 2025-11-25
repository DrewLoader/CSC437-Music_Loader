import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import "./components/app-header";
import "./views/home-view";
import "./components/playlist-view";
import "./components/playlist-details";
import "./components/playlist-songs";

const routes: Switch.Route[] = [
  {
    path: "/app/playlist/:name",
    view: (p: Switch.Params) => html`
      <playlist-view src=${`/api/playlists/${encodeURIComponent(p.name)}`}></playlist-view>
    `
  },
  // Home
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
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