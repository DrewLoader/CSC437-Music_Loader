// src/services/playlist-svc.ts
import { Schema, model } from "mongoose";
import type { PlaylistView, Track } from "../models/playlist-view";

const TrackSchema = new Schema<Track>(
  {
    title: { type: String, required: true, trim: true },
    href:  { type: String, required: true, trim: true },
    added: { type: String }
  },
  { _id: false }
);

const PlaylistSchema = new Schema<PlaylistView>(
  {
    name:        { type: String, required: true, trim: true, unique: true },
    ownerName:   { type: String, required: true, trim: true },
    ownerHref:   { type: String },
    visibility:  { type: String, required: true, trim: true },
    created:     { type: String, required: true },
    description: { type: String },
    tracks:      { type: [TrackSchema], default: [] }
  },
  { collection: "playlists" }
);

const PlaylistModel = model<PlaylistView>("Playlist", PlaylistSchema);

function index(): Promise<PlaylistView[]> {
  return PlaylistModel.find().lean();
}

function get(name: string): Promise<PlaylistView | null> {
  return PlaylistModel.findOne({ name }).lean();
}

async function create(doc: PlaylistView): Promise<PlaylistView> {
  const created = await PlaylistModel.create(doc);
  return created.toObject();
}

async function update(name: string, updates: Partial<PlaylistView>): Promise<PlaylistView | null> {
  const updated = await PlaylistModel.findOneAndUpdate(
    { name },
    updates,
    { new: true, runValidators: true }
  ).lean();
  return updated;
}

async function remove(name: string): Promise<boolean> {
  const res = await PlaylistModel.deleteOne({ name });
  return res.deletedCount === 1;
}

export default { index, get, create, update, remove };