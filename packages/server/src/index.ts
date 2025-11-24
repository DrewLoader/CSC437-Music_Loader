import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

import { connect } from "./services/mongo";
import PlaylistRouter from "./routes/playlists";
import auth, { authenticateUser } from "./routes/auth";

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


app.use("/app", async (_req: Request, res: Response) => {
  try {
    const indexHtml = path.resolve(staticDir, "index.html");
    const html = await fs.readFile(indexHtml, "utf8");
    res.type("html").send(html);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});