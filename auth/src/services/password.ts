import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const hash = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${hash.toString("hex")}.${salt}`;
  }
  static async compare(hashedPassword: string, suppliedPassword: string) {
    const [hash, salt] = hashedPassword.split(".");
    const suppliedPasswordHash = (await asyncScrypt(
      suppliedPassword,
      salt,
      64
    )) as Buffer;

    return suppliedPasswordHash.toString("hex") === hash;
  }
}
