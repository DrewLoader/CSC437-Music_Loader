import { PlaylistView } from "server/models";

export interface Model {
  playlist?: PlaylistView;
  playlists?: PlaylistView[];
  username?: string;
}

export const init: Model = {};