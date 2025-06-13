import { FastifyInstance } from "fastify";

import { createLinkRoute } from "@/infra/http/routes/links/create-link-route";
import { exportLinksRoute } from "@/infra/http/routes/links/export-links-route";
import { trackLinkAccessRoute } from "@/infra/http/routes/links/track-link-access-route";
import { deleteLinkAccessRoute } from "@/infra/http/routes/links/delete-link-route";
import { getLinkByShortUrlRoute } from "@/infra/http/routes/links/get-link-by-short-url-route";
import { getLinksRoute } from "@/infra/http/routes/links/get-links-route";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(createLinkRoute);
  await app.register(exportLinksRoute);
  await app.register(trackLinkAccessRoute);
  await app.register(deleteLinkAccessRoute);
  await app.register(getLinkByShortUrlRoute);
  await app.register(getLinksRoute);
}
