import { db } from "@/infra/db";
import { shortLinks } from "@/infra/db/schemas/short-links";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { ShortUrlAlreadyExists } from "@/app/links/errors/short-url-already-exists-error";
import { createLinkSchema } from "@/app/links/validations/create-link-schema";

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLink(
  input: Partial<CreateLinkInput>
): Promise<Either<ShortUrlAlreadyExists, {}>> {
  const { originalUrl, shortUrl } = createLinkSchema.parse(input);

  const [shortUrlAlreadyExists] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortUrl, shortUrl));

  if (shortUrlAlreadyExists) {
    return makeLeft(new ShortUrlAlreadyExists(shortUrl));
  }

  const [link] = await db
    .insert(shortLinks)
    .values({
      originalUrl,
      shortUrl,
    })
    .returning();

  return makeRight({});
}
