import { z } from "zod";

export const linkSchema = z.object({
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(1, "O nome do link encurtado é obrigatório.")
    .regex(/^[a-z0-9][a-z0-9-_]*$/, {
      message:
        "Informe um nome para o link encurtado minúsculo, sem espaços e caracteres especiais.",
    })
    .toLowerCase(),
  accessCount: z.number(),
  createdAt: z.date(),
});
