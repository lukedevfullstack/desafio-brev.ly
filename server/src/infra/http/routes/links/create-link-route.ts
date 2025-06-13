import { createLinkSchema } from "@/app/links/validations/create-link-schema";
import { isRight, unwrapEither } from "@/shared/either";
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { createLink } from "@/app/links/use-cases/create-link-use-case";

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/links",
    schema: {
      body: createLinkSchema,
      response: {
        201: z.object({}),
        409: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { body } = request;
      const { originalUrl, shortUrl } = request.body;

      const result = await createLink({
        originalUrl,
        shortUrl,
      });

      if (isRight(result)) {
        return reply.status(201).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "ShortUrlAlreadyExists":
          return reply.status(409).send({
            message: error.message,
          });
      }
    },
  });
};
