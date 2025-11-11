// src/services/playlist-svc.ts
import { Schema, model } from "mongoose";

export type Track = { title: string; href: string; added?: string };

export type PlaylistData = {
  details: {
    name: string;
    ownerName: string;
    ownerHref?: string;
    visibility: string;
    created: string;
    description: string;
  };
  tracks: Track[];
};


type PlaylistRecord = {
  name: string;
  normalizedName: string;
  ownerName: string;
  ownerHref?: string;
  visibility: string;
  created: string;
  description: string;
  tracks: Track[];
};

const TrackSchema = new Schema<Track>(
  {
    title: { type: String, required: true, trim: true },
    href:  { type: String, required: true, trim: true },
    added: { type: String }
  },
  { _id: false }
);

const PlaylistSchema = new Schema<PlaylistRecord>(
  {
    name:           { type: String, required: true, trim: true },
    normalizedName: { type: String, required: true, index: true, unique: true },
    ownerName:      { type: String, required: true, trim: true },
    ownerHref:      { type: String },
    visibility:     { type: String },
    created:        { type: String },
    description:    { type: String },
    tracks:         { type: [TrackSchema], default: [] }
  },
  { collection: "playlists" }
);

const PlaylistModel = model<PlaylistRecord>("Playlist", PlaylistSchema);

function toView(doc: PlaylistRecord): PlaylistData {
  return {
    details: {
      name: doc.name,
      ownerName: doc.ownerName,
      ownerHref: doc.ownerHref,
      visibility: doc.visibility,
      created: doc.created,
      description: doc.description
    },
    tracks: doc.tracks
  };
}

async function index(): Promise<PlaylistData[]> {
  const docs = await PlaylistModel.find().lean();
  return docs.map((d) => toView(d as PlaylistRecord));
}

async function get(name: string): Promise<PlaylistData | null> {
  const doc = await PlaylistModel
    .findOne({ normalizedName: name.toLowerCase() })
    .lean();
  return doc ? toView(doc as PlaylistRecord) : null;
}

export default { index, get}