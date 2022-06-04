import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../database/db";
import { seedData } from "../../database/seed-data";
import { Entry } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    res.status(401).json({ message: "you haven't access to service" });
  }

  await connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await disconnect();

  res.status(200).json({ message: "process done correctly" });
}
