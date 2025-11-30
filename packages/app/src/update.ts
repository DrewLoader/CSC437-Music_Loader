import { Auth, ThenUpdate, Message } from "@calpoly/mustang";
import { Msg } from "./message";
import { Model } from "./model";
import { PlaylistView, Track } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [command, payload, callbacks] = message;
  
  switch (command) {
    case "playlists/request": {
      return [
        model,
        requestPlaylists(user)
          .then((playlists) => ["playlists/load", { playlists }])
      ];
    }
    
    case "playlists/load": {
      const { playlists } = payload;
      return { 
        ...model, 
        playlists,
        username: (user as Auth.AuthenticatedUser)?.username 
      };
    }
    
    case "playlist/request": {
      const { name } = payload;
      if (model.playlist?.name === name) break;
      return [
        { ...model, playlist: undefined },
        requestPlaylist(payload, user)
          .then((playlist) => ["playlist/load", { name, playlist }])
      ];
    }
    
    case "playlist/load": {
      const { playlist } = payload;
      return { ...model, playlist };
    }
    
    case "playlist/create": {
      return [
        model,
        createPlaylist(payload, user, callbacks || {})
          .then((playlist) => ["playlist/created", { playlist }])
      ];
    }
    
    case "playlist/created": {
      const { playlist } = payload;
      const playlists = model.playlists || [];
      return {
        ...model,
        playlists: [...playlists, playlist]
      };
    }
    
    case "playlist/save": {
      const { name } = payload;
      return [
        model,
        savePlaylist(payload, user, callbacks || {})
          .then((playlist) => ["playlist/load", { name, playlist }])
      ];
    }
    
    case "track/save": {
      const { playlistName } = payload;
      return [
        model,
        saveTrack(payload, user)
          .then((savedTrack) => ["track/added", { playlistName, track: savedTrack }])
      ];
    }
    
    case "track/added": {
      const { playlistName, track } = payload;
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
      const unhandled: never = command;
      throw new Error(`Unhandled message "${unhandled}"`);
  }
  
  return model;
}

function requestPlaylists(user: Auth.User): Promise<PlaylistView[]> {
  return fetch("/api/playlists", {
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
      if (Array.isArray(json)) {
        return json.map(item => helperPlaylist(item));
      }
      throw new Error("Invalid playlists response");
    });
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

function createPlaylist(
  msg: {
    playlist: PlaylistView;
  },
  user: Auth.User,
  callbacks: Message.Reactions
): Promise<PlaylistView> {
  return fetch("/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.playlist)
  })
    .then((response: Response) => {
      if (response.status === 201 || response.status === 200) {
        return response.json();
      }
      throw new Error(`Failed to create playlist: ${response.status}`);
    })
    .then((json: unknown) => {
      if (json) {
        if (callbacks.onSuccess) callbacks.onSuccess();
        return helperPlaylist(json);
      }
      throw new Error("No JSON in API response");
    })
    .catch((err) => {
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err;
    });
}

function savePlaylist(
  msg: {
    name: string;
    playlist: Partial<PlaylistView>;
  },
  user: Auth.User,
  callbacks: Message.Reactions
): Promise<PlaylistView> {
  return fetch(`/api/playlists/${encodeURIComponent(msg.name)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.playlist)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to save playlist ${msg.name}`);
    })
    .then((json: unknown) => {
      if (json) {
        if (callbacks.onSuccess) callbacks.onSuccess();
        return helperPlaylist(json);
      }
      throw new Error("No JSON in API response");
    })
    .catch((err) => {
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err;
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