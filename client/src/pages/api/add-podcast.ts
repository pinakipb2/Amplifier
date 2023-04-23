import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  try {
    //@ts-ignore
    const uploadedResponse = await cloudinary.uploader.upload(req.body.podcast, 'Amplifier', { resource_type: 'auto' });

    const result = await prisma.podcast.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        speaker: req.body.speaker,
        podcastPlaylistId: req.body.podcastPlaylistId,
        podcast_url: uploadedResponse.url,
      },
      include: {
        playlist: true
      }
    });
    return res.send({ result });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
