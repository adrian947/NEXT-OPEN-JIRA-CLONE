import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import { Entry } from "../../../models";
import { IEntry } from "../../../models/Entry";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return addEntry(req, res);

    default:
      return res.status(400).json({ message: "end point not exist" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await connect();

  const entries = await Entry.find().sort({ createAT: "ascending" });

  await disconnect();

  res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const newEntry = new Entry({ description, createdAt: Date.now() });

  try {
    await connect();

    await newEntry.save();

    await disconnect();

    res.status(201).json(newEntry);
  } catch (error) {
    await disconnect();
    console.log(error);
    res.status(400).json({ message: "error see server's console" });
  }
};
