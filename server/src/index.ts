import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");
import morgan = require("morgan");
import mongoose = require("mongoose");
import multer = require("multer");
import fs = require("fs-extra");
import {
  addMovie,
  fetchMovies,
  handleCoverUpload,
  deleteMovie,
  updateMovie,
} from "./handler/movies.handler";
import { IMovie } from "./models/movies.model";
import {
  writeError,
  writeJsonResponse,
  writeServerError,
} from "./helpers/helpers";

export const uploadsDir = "covers";

const key = fs.readFileSync("./ssl_certificate/key.pem");

const cert = fs.readFileSync("./ssl_certificate/cert.pem");

import https = require("https");
import config from "./config";

const app = express();
// const server = https.createServer({ key: key, cert: cert }, app);

const DB_URL = config.dbUrl;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database Connection error"));
db.once("open", function (callback) {
  console.log("🚀 Database Connection Succeeded");
});

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.info(`Directory '${uploadsDir}' is created.`);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 200, // 200 MB
  },
});

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type,accept,access_token,X-Requested-With"
//   );
//   next();
// });

app.get("/movies", async (req, res) => {
  try {
    const movies = await fetchMovies();
    writeJsonResponse(res, 200, movies);
  } catch (error) {
    writeServerError(res, error);
  }
});

app.get("/cover/:coverPicture", async (req, res) => {
  if (!req.params.coverPicture) writeError(res, 400, "Bad Request");

  if (await fs.pathExists(`${uploadsDir}/${req.params.coverPicture}`)) {
    const coverBuffer: Buffer = await fs.readFile(
      `${uploadsDir}/${req.params.coverPicture}`
    );
    const fileData = {
      mediaType: "image/jpeg",
      weightB: coverBuffer.length,
      binData: coverBuffer,
      fileName: req.params.coverPicture,
    };

    if (fileData) {
      res.type(fileData.mediaType);
      res.set("Content-Length", fileData.weightB.toString());
      // res.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeRFC5987ValueChars(fileData.fileName)}`)
      res.write(fileData.binData);
    } else {
      res.status(404);
      res.send("404 Not Found");
    }
    res.end();
  } else {
    writeError(res, 404, "Not found");
  }
});

app.post("/movies", upload.single("movieCoverFile"), async (req, res) => {
  try {
    const uploadResult = await handleCoverUpload(req.file);
    const movie: IMovie = req.body;
    movie.cover = uploadResult;
    const response = await addMovie(movie);
    writeJsonResponse(res, 200, response);
  } catch (error) {
    writeServerError(res, error);
  }
});

app.patch("/movies", async (req, res) => {
  try {
    const movie: IMovie = req.body;
    const response = await updateMovie(movie);
    writeJsonResponse(res, 200, response);
  } catch (error) {
    writeServerError(res, error);
  }
});

app.delete("/movies/:movieId", async (req, res) => {
  try {
    if (!req.params.movieId) writeError(res, 400, "Bad Request");
    const movieId: string = req.params.movieId;
    const response = await deleteMovie(movieId);
    writeJsonResponse(res, 200, response);
  } catch (error) {
    writeServerError(res, error);
  }
});

app.listen(process.env.PORT || 8081);
console.log(`🚀 Samamovies backend started and listening on 8081`);
