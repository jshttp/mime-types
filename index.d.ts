declare module "mime-types" {
  export function charset(type: string): string | false;
  export function contentType(str: string): string | false;
  export function extension(type: string): string | false;
  export function lookup(path: string): string | false;

  export namespace charsets {
    const lookup: typeof charset;
  }
  export const types: { [key: string]: string };
  export const extensions: { [key: string]: string[] };
}
