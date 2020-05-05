import Movie, { IMovie } from "../models/movies.model";
import { ReqResponse } from "../helpers/types";
import { writeFile, MoveOptions, pathExists, unlink } from "fs-extra";
import { uploadsDir } from "../index";
import { v4 as uuidv4 } from "uuid";
import { createCanvas, loadImage } from "canvas";
import { promisify } from "util";

var sizeOf = promisify(require("image-size"));

export async function addMovie(movie: IMovie): Promise<ReqResponse | void> {
  const actorsList = new String(movie.actorsList).split("-");
  const newMovie = new Movie({
    id: uuidv4(),
    title: movie.title,
    about: movie.about,
    cover: movie.cover,
    sentiment: movie.sentiment,
    actorsList,
  });

  try {
    await newMovie.save();
    return {
      success: true,
      message: "Movies successfully saved!",
      data: newMovie,
    };
  } catch (error) {
    console.log("------- Save error:", error);
    return {
      success: false,
      message: `An error occured:  ${error}`,
    };
  }
}

export async function handleCoverUpload(uploadedCover: any): Promise<string> {
  try {
    console.log("uploadedCover:", uploadedCover);
    if (!uploadedCover.buffer)
      throw new Error(
        "Missing file buffer. Maybe an error occured during the upload"
      );

    var fileFormat = uploadedCover.mimetype.split("/")[1];
    if (fileFormat === "jpeg") fileFormat = "jpg";
    const coverBuffer: Buffer = uploadedCover.buffer;
    const saveName: string = `${uuidv4()}.${fileFormat}`;
    const savePath: string = `${uploadsDir}/${saveName}`;

    await writeFile(savePath, coverBuffer);
    await signCover(savePath, saveName);
    return saveName;
  } catch (error) {
    console.error(error.message);
  }
}

async function signCover(coverPath: string, coverName: string): Promise<void> {
  try {
    const { height, width } = await sizeOf(coverPath);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const coverImage = await loadImage(coverPath);
    ctx.drawImage(coverImage, 0, 0, width, height);
    ctx.font = "30px Impact";
    ctx.fillText("© Samamovie", 25, 50);
    const signedCoverBuffer: Buffer = canvas.toBuffer("image/jpeg");
    await writeFile(`${uploadsDir}/${coverName}`, signedCoverBuffer);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function fetchMovies(): Promise<IMovie[]> {
  try {
    const movies = Movie.find(
      {},
      "id title about cover actorsList sentiment"
    ).sort({ _id: "desc" });
    return movies;
  } catch (error) {
    console.log("------- Retrieve error:", error);
  }
}

export async function deleteMovie(movieId: string): Promise<string> {
  try {
    Movie.findOne({ id: movieId }, async function (err, movie) {
      if (movie) {
        if (pathExists(`${uploadsDir}/${movie.cover}`))
          await unlink(`${uploadsDir}/${movie.cover}`);
      }
    });
    Movie.findOneAndDelete({ id: movieId }, (err) => {
      if (err)
        return `An error occured while trying to delete movie with id ${movieId}`;
      else return movieId;
    });
    return movieId;
  } catch (error) {
    console.log("------- Deletion error:", error);
  }
}

export async function updateMovie(movie: IMovie): Promise<IMovie> {
  try {
    const theMovie = await Movie.findById(movie._id);
    const actorsList = new String(movie.actorsList).split("-");
    theMovie.title = movie.title;
    theMovie.about = movie.about;
    theMovie.actorsList = actorsList;
    theMovie.save(function (error) {
      if (error) {
        console.log(error);
      }
    });
    return theMovie;
  } catch (error) {
    console.log("------- Update error:", error);
  }
}
