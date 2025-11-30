import { PlaylistView } from "server/models";

export interface Model {
  playlist?: PlaylistView;
}

export const init: Model = {};