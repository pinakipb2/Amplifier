import cloudinary from "@/lib/cloudinary";
import { parseForm } from "@/lib/parse-form";
import fs from "fs";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { join } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { files } = await parseForm(req);
    // @ts-ignore
    const currFile = join(process.env.ROOT_DIR || process.cwd(), `/uploads/${files.file.newFilename}`);
    const contents = fs.readFileSync(currFile);
    const base64Content = contents.toString("base64");
    // @ts-ignore
    const pod = `data:${files.file.mimetype};base64,` + base64Content;
    // @ts-ignore
    const uploadedResponse = await cloudinary.uploader.upload(pod, "Amplifier", { resource_type: "auto" });
    console.log(uploadedResponse);
    // @ts-ignore
    return res.send({ url: uploadedResponse.url });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
