import { z } from "zod";
import { getLinkByShortUrlSchema } from "@/app/links/validations/get-link-by-short-url-schema";
import { db } from "@/infra/db";
import { shortLinks } from "@/infra/db/schemas/short-links";
import { eq } from "drizzle-orm";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFound } from "@/app/links/errors/link-not-found-error";

import { linkSchema } from "../validations/link-schema";

type GetLinkByShortUrlInput = z.infer<typeof getLinkByShortUrlSchema>;
type GetLinkByShortUrlOutput = z.infer<typeof linkSchema>;

export async function getLinkByShortUrlUseCase(
  input: GetLinkByShortUrlInput
): Promise<Either<LinkNotFound, GetLinkByShortUrlOutput>> {
  const { shortUrl } = getLinkByShortUrlSchema.parse(input);

  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortUrl, shortUrl));

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight(link);
}
