import { getLinksUseCase } from "@/app/links/use-cases/get-links-use-case";
import { linkSchema } from "@/app/links/validations/link-schema";
import { isRight, unwrapEither } from "@/shared/either";
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/links",
    schema: {
      response: {
        200: linkSchema.array(),
      },
    },
    handler: async (request, reply) => {
      const result = await getLinksUseCase();

      if (isRight(result)) {
        const links = unwrapEither(result);
        return reply.status(200).send(links);
      }
    },
  });
};
