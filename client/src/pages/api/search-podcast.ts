import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { ZodError, z } from "zod";

const searchSchema = z
  .object({
    term: z.string().trim(),
  })
  .strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { term } = await searchSchema.parseAsync(req.body);
      const result = await prisma.podcast.findMany({
        where: {
          name: {
            search: term,
          },
          description: {
            search: term,
          },
          speaker: {
            search: term,
          },
        },
        include: { playlist: true },
      });
      if (result.length > 0) {
        return res.send({ result });
      }
      return res.send({ message: "No Result Found" });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(500).json({ message: err.issues });
      }
      console.log(err);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ message: "HTTP method not valid only POST Accepted" });
  }
}
