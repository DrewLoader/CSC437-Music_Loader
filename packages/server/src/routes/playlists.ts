// src/routes/playlists.ts
import express, { Request, Response } from "express";
import { PlaylistView } from "../models/playlist-view";
import Playlists from "../services/playlistView-src";

const router = express.Router();    

router.get("/", async (_req: Request, res: Response) => {
  try {
    const list = await Playlists.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

router.get("/:name", async (req: Request, res: Response) => {
  try {
    const item = await Playlists.get(req.params.name);
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<PlaylistView>;
    if (!body?.name || !body?.ownerName || !body?.visibility || !body?.created) {
      return res.status(400).send("Missing required fields: name, ownerName, visibility, created");
    }
    if (body.tracks && !Array.isArray(body.tracks)) {
      return res.status(400).send("tracks must be an array");
    }
    const created = await Playlists.create({
      name: body.name,
      ownerName: body.ownerName,
      ownerHref: body.ownerHref,
      visibility: body.visibility,
      created: body.created,
      description: body.description ?? "",
      tracks: body.tracks ?? []
    });
    res
      .status(201)
      .location(`/api/playlists/${encodeURIComponent(created.name)}`)
      .json(created);
  } catch (err: any) {
    if (err?.code === 11000) return res.status(409).send("Playlist with that name already exists");
    res.status(500).send(String(err));
  }
});


router.put("/:name", async (req: Request, res: Response) => {
  try {
    const updated = await Playlists.update(req.params.name, req.body as Partial<PlaylistView>);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    res.status(500).send(String(err));
  }
});


router.delete("/:name", async (req: Request, res: Response) => {
  try {
    const ok = await Playlists.remove(req.params.name);
    if (!ok) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

export default router;