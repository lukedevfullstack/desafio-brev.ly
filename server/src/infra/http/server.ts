import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "@/env";

import { registerRoutes } from "@/infra/http/routes/registerRoutes";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyMultipart);

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      error: "Response Validation Error",
      message: "Request doesn't match the schema",
      statusCode: 400,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    });
  }

  console.log(error);

  return reply.status(500).send({ message: "Internal server error" });
});

app.register(registerRoutes);

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then((address) => {
    console.log(`Server is running at ${address} 🚀🔥`);
  });
