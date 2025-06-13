import { z } from "zod";

export const deleteLinkSchema = z.object({
  shortUrl: z
    .string()
    .min(1, "O nome do link encurtado é obrigatório!")
    .regex(/^[a-z0-9][a-z0-9-_]*$/, {
      message:
        "Informe um nome para o link encurtado minúsculo, sem espaços e caracteres especiais.",
    })
    .toLowerCase(),
});
