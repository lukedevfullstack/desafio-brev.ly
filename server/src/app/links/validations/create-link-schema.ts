import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().min(1, "O link é obrigatório.").url({
    message: `A URL deve começar com "http://" ou "https://"`,
  }),
  shortUrl: z
    .string()
    .min(1, "O nome do link encurtado é obrigatório!")
    .regex(/^[a-z0-9][a-z0-9-_]*$/, {
      message:
        "Informe um nome para o link encurtado minúsculo, sem espaços e caracteres especiais.",
    })
    .toLowerCase(),
});
