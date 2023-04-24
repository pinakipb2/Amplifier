import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import DatauriParser from 'datauri/parser';
import { NextApiRequest, NextApiResponse } from "next";
const parser = new DatauriParser();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  try {
    //@ts-ignore
    const uploadedImageResponse = await cloudinary.uploader.upload(req.body.image, 'Amplifier', { resource_type: 'image' });

    const result = await prisma.podcastPlaylist.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: uploadedImageResponse.url
      }
    });
    return res.send({ result });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
