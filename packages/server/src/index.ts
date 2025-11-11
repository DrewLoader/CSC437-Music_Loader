// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import PlaylistRouter from "./routes/playlists";
import auth, {authenticateUser} from "./routes/auth";




const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("Music");

app.use(express.static(staticDir));
app.use(express.json());

app.use("/api/playlists", PlaylistRouter, authenticateUser);
app.use("/api/auth", auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

