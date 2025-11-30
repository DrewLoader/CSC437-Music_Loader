import { PlaylistView, Track } from "server/models";

export type Msg =
  | ["playlist/request", { name: string }]
  | ["track/add", { playlistName: string; track: Track }]
  | ["track/save", { playlistName: string; track: Track }]
  | Cmd;

type Cmd =
  | ["playlist/load", { name: string; playlist: PlaylistView }]
  | ["track/added", { playlistName: string; track: Track }];