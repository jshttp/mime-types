declare module "mime-types" {
    export function lookup(filename: string): string;
    export function contentType(filename: string): string;
    export function extension(contentType: string): string;
    export function charset(contentType: string): string;
    export var extensions: { [extension: string]: string };
    export var types: { [contentType: string]: string };
}
