import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import type { NextApiRequest } from "next";
import { join } from "path";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.env.ROOT_DIR || process.cwd(), `/uploads`);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      multiples: false,
      maxFileSize: 1024 * 1024 * 500, // 500mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const ext = part.originalFilename?.split(".").at(-1);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${ext}`;
        return filename;
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
