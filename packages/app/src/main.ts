import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import "./components/app-header";
import "./views/home-view";
import "./components/playlist-view";

const routes: Switch.Route[] = [
  {
    path: "/app/playlist/:name",
    view: (params: Switch.Params) => html`
      <playlist-view playlist-name=${params.name}></playlist-view>
    `
  },
  // Home
  {
    path: "/app",
    view: () => html`<landing-view></landing-view>`
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