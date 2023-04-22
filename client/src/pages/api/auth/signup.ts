import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { genSalt, hash } from "bcryptjs";
import { ZodError, z } from "zod";

const noSpacesRegex = /^[^\s]+$/;
const emailSchema = z.string().min(4, "Email must contain at least 4 characters").max(60, "Email must contain at most 60 characters").email("Please enter a valid email").trim();
const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .max(50, "Password must contain at most 50 characters")
  .regex(noSpacesRegex, "Password cannot contain spaces")
  .trim();
const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: z.string().trim(),
  })
  .strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = await registerSchema.parseAsync(req.body);
      const checkExisting = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (checkExisting) return res.status(422).json({ message: "User Already Exists !" });
      var salt = await genSalt(10);
      var passHash = await hash(password, salt);
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: passHash,
          },
        });
        return res.status(201).json({ status: true, user });
      } catch (err: any) {
        return res.status(404).json({ err });
      }
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(500).json({ message: err.issues });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ message: "HTTP method not valid only POST Accepted" });
  }
}
