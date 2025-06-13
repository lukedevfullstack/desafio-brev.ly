import { trackLinkAccessUseCase } from "@/app/links/use-cases/track-link-access-use-case";
import { isRight, unwrapEither } from "@/shared/either";
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

export const trackLinkAccessRoute: FastifyPluginAsyncZod = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "PATCH",
    url: "/links/:shortUrl",
    schema: {
      params: z.object({
        shortUrl: z.string(),
      }),
      response: {
        200: z.object({}),
        400: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await trackLinkAccessUseCase({ shortUrl });

      if (isRight(result)) {
        return reply.status(200).send();
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
