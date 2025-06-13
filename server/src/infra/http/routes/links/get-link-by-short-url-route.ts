import { getLinkByShortUrlUseCase } from "@/app/links/use-cases/get-link-by-short-url-use-case";
import { createLinkSchema } from "@/app/links/validations/create-link-schema";
import { getLinkByShortUrlSchema } from "@/app/links/validations/get-link-by-short-url-schema";
import { isRight, unwrapEither } from "@/shared/either";
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/links/:shortUrl",
    schema: {
      params: getLinkByShortUrlSchema,
      response: {
        200: createLinkSchema,
        400: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await getLinkByShortUrlUseCase({ shortUrl });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(200).send(link);
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkNotFound":
          return reply.status(400).send({
            message: error.message,
          });
      }
    },
  });
};
