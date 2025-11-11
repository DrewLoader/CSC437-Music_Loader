// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Playlists from "./services/playlistView-src";
import path from "node:path";
import { readFile } from "node:fs/promises";




const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

connect("Music");

app.get("/playlists/:name", async (req, res) => {
  try {
    const { name } = req.params;                    
    const base = process.env.STATIC || "public";    
    // file is playlist-<name>.json, case-insensitive:
    const file = path.join(base, "data", `playlist-${name.toLowerCase()}.json`);
    const json = await readFile(file, "utf8");
    res.type("application/json").send(json);
  } catch (err) {
    console.error("playlist route error:", err);
    res.sendStatus(404);
  }
});
app.get("/playlists/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const doc = await Playlists.get(name);
    if (!doc) return res.status(404).end();
    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});