// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Playlists from "./services/playlistView-src";




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

app.get("/playlists/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  Playlists.get(name).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});