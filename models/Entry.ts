import mongoose, { Schema, Model } from "mongoose";
import { Entry } from '../interfaces/interfaces';

export interface IEntry extends Entry{}


const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "inProgress", "complete"],
      message: "{VALUE}, not a permitted state ",
    },
    default: 'pending'
  },
});


const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;