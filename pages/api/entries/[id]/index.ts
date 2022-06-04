import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models/Entry";
import { connect, disconnect } from "../../../../database/db";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid request" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "end point not exist" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await connect();
  try {
    const resp = await Entry.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resp) return res.status(400).json({ message: "Invalid request" });

    res.status(201).json(resp);

    await disconnect();
  } catch (error: any) {
    await disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await connect();

  try {
    const resp = await Entry.findById(id);

    if (!resp) return res.status(400).json({ message: "Invalid request" });

    res.status(200).json(resp);
    await disconnect();
  } catch (error: any) {
    await disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await connect();

  try {
    const resp = await Entry.findByIdAndDelete(id);

    if (!resp) return res.status(400).json({ message: "Invalid request" });

    res.status(200).json({ message: "Entry deleted" });
    await disconnect();
  } catch (error: any) {
    await disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};
