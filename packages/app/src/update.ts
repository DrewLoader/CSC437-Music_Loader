import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { PlaylistView, Track } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  switch (message[0]) {
    case "playlist/request": {
      const { name } = message[1];
      if (model.playlist?.name === name) break;
      return [
        { ...model, playlist: undefined },
        requestPlaylist(message[1], user)
          .then((playlist) => ["playlist/load", { name, playlist }])
      ];
    }
    case "playlist/load": {
      const { playlist } = message[1];
      return { ...model, playlist };
    }
    case "track/save": {
      const { playlistName, track } = message[1];
      return [
        model, // Keep current model while saving
        saveTrack(message[1], user)
          .then((savedTrack) => ["track/added", { playlistName, track: savedTrack }])
      ];
    }
    case "track/added": {
      const { playlistName, track } = message[1];
      // Add the new track to the playlist in the model
      if (model.playlist && model.playlist.name === playlistName) {
        return {
          ...model,
          playlist: {
            ...model.playlist,
            tracks: [...model.playlist.tracks, track]
          }
        };
      }
      return model;
    }
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
  return model;
}

function requestPlaylist(
  payload: { name: string },
  user: Auth.User
): Promise<PlaylistView> {
  return fetch(`/api/playlists/${encodeURIComponent(payload.name)}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      if (response.status === 401) {
        window.location.assign("/login.html");
      }
      throw new Error(`Server responded with status ${response.status}`);
    })
    .then((json: unknown) => {
      return helperPlaylist(json);
    });
}

function saveTrack(
  payload: { playlistName: string; track: Track },
  user: Auth.User
): Promise<Track> {
  const { playlistName, track } = payload;
  
  return fetch(`/api/playlists/${encodeURIComponent(playlistName)}/tracks`, {
    method: "POST",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(track)
  })
    .then((response: Response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
      if (response.status === 401) {
        window.location.assign("/login.html");
      }
      throw new Error(`Failed to save track: ${response.status}`);
    })
    .then((json: unknown) => {
      return json as Track;
    });
}

function helperPlaylist(json: any): PlaylistView {
  if (!json || typeof json !== 'object') {
    throw new Error("Invalid playlist payload");
  }

  const details: any = json.details ?? json;
  const tracks: any[] = json.tracks ?? [];

  if (!details?.name || !Array.isArray(tracks)) {
    throw new Error("Invalid playlist payload");
  }

  const okTracks: Track[] = tracks
    .filter(t => t && typeof t.title === 'string' && typeof t.href === 'string')
    .map(t => ({ 
      title: String(t.title), 
      href: String(t.href), 
      added: t.added ? String(t.added) : undefined 
    }));

  return {
    name: String(details.name),
    ownerName: String(details.ownerName ?? ''),
    ownerHref: details.ownerHref ? String(details.ownerHref) : undefined,
    visibility: String(details.visibility ?? ''),
    created: String(details.created ?? ''),
    description: String(details.description ?? ''),
    tracks: okTracks
  };
}