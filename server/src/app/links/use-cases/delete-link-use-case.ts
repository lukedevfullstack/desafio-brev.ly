import { db } from "@/infra/db";
import { shortLinks } from "@/infra/db/schemas/short-links";
import { eq } from "drizzle-orm";
import { deleteLinkSchema } from "../validations/delete-link-schema";
import { z } from "zod";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFound } from "@/app/links/errors/link-not-found-error";

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkUseCase(
  input: DeleteLinkInput
): Promise<Either<LinkNotFound, {}>> {
  const { shortUrl } = deleteLinkSchema.parse(input);

  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortUrl, shortUrl));

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  await db.delete(shortLinks).where(eq(shortLinks.shortUrl, shortUrl));

  return makeRight({});
}
