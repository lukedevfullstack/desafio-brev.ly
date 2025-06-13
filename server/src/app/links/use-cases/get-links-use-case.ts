import { z } from "zod";
import { db } from "@/infra/db";
import { shortLinks } from "@/infra/db/schemas/short-links";
import { Either, makeRight } from "@/shared/either";
import { LinkNotFound } from "@/app/links/errors/link-not-found-error";

import { linkSchema } from "../validations/link-schema";

type GetLinksOutput = z.infer<typeof linkSchema>;

export async function getLinksUseCase(): Promise<
  Either<LinkNotFound, GetLinksOutput[]>
> {
  const links = await db.select().from(shortLinks);

  return makeRight(links);
}
