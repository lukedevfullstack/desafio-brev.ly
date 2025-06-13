export class ShortUrlAlreadyExists extends Error {
  constructor(shortUrl: string) {
    super(`O link encurtado ${shortUrl} já existe.`);
  }
}
