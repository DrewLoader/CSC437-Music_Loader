import { PlaylistView, Track } from "server/models";

export type Msg =
  | ["playlists/request"]
  | ["playlist/request", { name: string }]
  | ["playlist/create", { 
      playlist: PlaylistView 
    }, {
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }]
  | ["playlist/save", { 
      name: string; 
      playlist: Partial<PlaylistView> 
    }, {
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }]
  | ["track/save", { playlistName: string; track: Track }]
  | Cmd;

type Cmd =
  | ["playlists/load", { playlists: PlaylistView[] }]
  | ["playlist/load", { name: string; playlist: PlaylistView }]
  | ["playlist/created", { playlist: PlaylistView }]
  | ["track/added", { playlistName: string; track: Track }];