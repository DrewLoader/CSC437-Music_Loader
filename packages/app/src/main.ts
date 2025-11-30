import { Auth, define, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./message";
import { Model, init } from "./model";
import update from "./update";
import "./components/app-header";
import "./views/home-view";
import "./views/playlist-view";
import "./components/playlist-details";
import "./components/playlist-songs";
import "./views/playlist-edit";

console.log("App loading, checking token...");
console.log("Token in localStorage:", localStorage.getItem("mu:auth:jwt"));

const routes: Switch.Route[] = [
  {
    path: "/app/playlist/:name",
    view: (p: Switch.Params) => html`
      <playlist-view playlist-name=${p.name}></playlist-view>
    `
  },
  {
    path: "/app/playlist/:name/edit",
    view: (p: Switch.Params) => html`
      <playlist-edit playlist-name=${p.name}></playlist-edit>
    `
  },
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
  },
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "music:auth");
    }
  }
});