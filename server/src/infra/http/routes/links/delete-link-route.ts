import { deleteLinkUseCase } from "@/app/links/use-cases/delete-link-use-case";
import { deleteLinkSchema } from "@/app/links/validations/delete-link-schema";
import { isRight, unwrapEither } from "@/shared/either";
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkAccessRoute: FastifyPluginAsyncZod = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "DELETE",
    url: "/links/:shortUrl",
    schema: {
      params: deleteLinkSchema,
      response: {
        200: z.object({}),
        400: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await deleteLinkUseCase({ shortUrl });

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
