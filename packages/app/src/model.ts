import { PlaylistView } from "../server/src/models";

export interface Model {
  playlist?: PlaylistView;
}

export const init: Model = {};