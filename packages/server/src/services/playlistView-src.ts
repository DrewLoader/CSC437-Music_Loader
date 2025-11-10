// src/services/playlistView-src.ts
import { Schema, model } from "mongoose";
import { PlaylistView } from "../models/playlist-view";

const PlaylistViewSchema = new Schema<PlaylistView>(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerHref: { type: String, required: true },
    visibility: { type: String, required: true },
    created: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: "Playlist-View" }
);

const PlaylistViewModel = model<PlaylistView>(
  "Playlist-View",
  PlaylistViewSchema
);

function index(): Promise<PlaylistView[]> {
  return PlaylistViewModel.find();
}

function get(name: String): Promise<PlaylistView> {
  return PlaylistViewModel.find({ name })
    .then((list) => list[0])
    .catch((err) => {
      throw `${name} Not Found`;
    });
}

export default { index, get };