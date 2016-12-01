/**
 * Get the default charset for a MIME type.
 *
 * @param {string} mimeType MIME type
 * @return {string|boolean} the default charset or false if not found
 */
export function charset (mimeType: string): string

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} type MIME type or extension
 * @return {boolean|string} Content-Type header
 */
export function contentType (type: string): string

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} mimeType MIME type
 * @return {boolean|string} the extension or false if not found
 */
export function extension (mimeType: string): string

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {string|boolean} MIME type, or false if not found
 */
export function lookup (path: string): string

/**
 * charsets.lookup redirects to lookup
 */
export var charsets: {lookup: (mimeType: string) => string}

/**
 * File extensions indexed by MIME type
 */
export var extensions: { [extension: string]: string };

/**
 * MIME types indexed by (lower case) file extension
 */
export var types: { [contentType: string]: string };