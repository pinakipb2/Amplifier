import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body);

    const result = await prisma.podcast.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        speaker: req.body.speaker,
        podcastPlaylistId: req.body.podcastPlaylistId,
        podcast_url: req.body.podcast_url,
      },
      include: {
        playlist: true,
      },
    });
    return res.send({ result });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
