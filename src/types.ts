import type { MimeDatabase, MimeEntry, MimeSource } from "mime-db";

type IExtNameFn = (path: string) => string;

interface IMimeTypes {
  types: Record<string, string>;
  extensions: Record<string, Array<string>>;
  typeSets: Record<string, Array<string>>;

  getCharset(str: string): boolean | string;
  getContentType(str: string): boolean | string;
  getExtension(type: string): boolean | string;
  getMime(type: string): boolean | string;
  getMimes(type: string): boolean | Array<string>;
}

export type { MimeDatabase, MimeEntry, MimeSource, IExtNameFn, IMimeTypes };
