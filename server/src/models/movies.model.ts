import { Document, Model, model, Types, Schema, Query } from "mongoose";

export interface IMovie extends Document {
  id: string;
  title: string;
  about: string;
  cover: string;
  actorsList: string | string[];
  sentiment: string;
}

const MovieSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  cover: { type: String, required: true },
  actorsList: { type: Array, required: true },
  sentiment: { type: String, required: true },
});

// Export the model and return your IMovie interface
export default model<IMovie>("Movies", MovieSchema);
