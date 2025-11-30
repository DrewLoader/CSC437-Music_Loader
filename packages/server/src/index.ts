import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

import { connect } from "./services/mongo";
import PlaylistRouter from "./routes/playlists";
import auth, { authenticateUser } from "./routes/auth";

export type { PlaylistView, Track } from "./models/playlist-view";
export type { Credential } from "./models/credential";

const app = express();
const port = process.env.PORT || 3000;

const staticDir = process.env.STATIC || "public";


connect("Music");


app.use(express.static(staticDir));
app.use(express.json());


app.use("/auth", auth);


app.use("/api/playlists", authenticateUser, PlaylistRouter);


app.get("/", (_req: Request, res: Response) => {
  res.redirect("/app");
});


app.use("/app", (req, res) => {
  const staticDir = process.env.STATIC || path.resolve(__dirname, "../../app/dist");
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});