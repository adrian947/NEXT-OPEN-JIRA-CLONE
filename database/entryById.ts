import mongoose from "mongoose";
import { Entry } from "../models";
import { connect, disconnect } from "./db";
import { IEntry } from "../models/Entry";

export const entryById = async (id: string): Promise<IEntry | null> => {
  if (!mongoose.isValidObjectId(id)) return null;

  await connect();

  const entry = await Entry.findById(id).lean();
  await disconnect();

  return  JSON.parse(JSON.stringify(entry));
};
