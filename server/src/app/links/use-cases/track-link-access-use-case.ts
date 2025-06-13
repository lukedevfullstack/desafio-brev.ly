import { db } from "@/infra/db";
import { shortLinks } from "@/infra/db/schemas/short-links";
import { eq } from "drizzle-orm";
import { trackLinkAccessSchema } from "@/app/links/validations/track-link-access-schema";
import { z } from "zod";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFound } from "@/app/links/errors/link-not-found-error";

type TrackLinkAccessInput = z.input<typeof trackLinkAccessSchema>;

export async function trackLinkAccessUseCase(
  input: TrackLinkAccessInput
): Promise<Either<LinkNotFound, {}>> {
  const { shortUrl } = trackLinkAccessSchema.parse(input);

  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortUrl, shortUrl));

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  await db
    .update(shortLinks)
    .set({
      accessCount: link.accessCount + 1,
    })
    .where(eq(shortLinks.shortUrl, shortUrl));

  return makeRight({});
}
