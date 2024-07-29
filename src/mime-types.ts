import type { MimeDatabase, MimeEntry, IExtNameFn, IMimeTypes } from "./types";

class MimeTypes implements IMimeTypes {
  private db: MimeDatabase;
  private EXTRACT_TYPE_REGEXP: RegExp;
  private TEXT_TYPE_REGEXP: RegExp;
  types: Record<string, string>;
  extensions: Record<string, Array<string>>;
  typeSets: Record<string, Array<string>>;

  constructor(db: MimeDatabase, extNameFn?: IExtNameFn) {
    this.db = db;
    if (extNameFn) {
      this.setExtNameFn(extNameFn);
    }

    this.EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    this.TEXT_TYPE_REGEXP = /^text\//i;

    this.types = Object.create(null);
    this.extensions = Object.create(null);
    this.typeSets = Object.create(null);
    this.populateMaps();
  }

  /**
   * Extract extension from file path/name
   * @private
   * @param {string} path path to file
   * @returns {string} string  extension or empty string if not found
   */
  private extname = (path: string): string => {
    // let ext = path.split(".");
    // if (!!ext[ext.length - 2]) {
    //   return `.${ext[ext.length - 1]}`;
    // }
    // return "";
    const ext = /^.+\.([^.]+)$/.exec(path);
    return ext == null ? "" : `.${ext[1]}`;
  };

  /**
   * Set extname function for extracting extension from file path/name
   * @private
   * @param {Function} extname
   */
  private setExtNameFn(extname: IExtNameFn) {
    this.extname = extname;
  }

  /**
   * Obtain the extension of a filename or filepath.
   * If the path is not a string or a proper extension isn't found, false is returned.
   * The path is case insensitive (so hello.html and HELLO.HTML are equal).
   * @private
   * @param {string} path
   * @return {boolean|string} the file extension if available. false otherwise.
   */
  private extractExtension = (path: string): boolean | string => {
    if (!path || typeof path !== "string") {
      return false;
    }

    // get the extension ("ext" or ".ext" or full path)
    const extension = this.extname("x." + path)
      .toLowerCase()
      .substring(1);

    if (!extension) {
      return false;
    }

    return extension;
  };

  /**
   * Populate the extensions and types maps.
   * @private
   */
  private populateMaps = () => {
    // source preference (least -> most)
    const preference = ["nginx", "apache", undefined, "iana"];

    const db: MimeDatabase = this.db;
    const types = this.types;
    const typeSets = this.typeSets;

    Object.keys(db).forEach((type) => {
      const mime: MimeEntry = db[type];
      const exts = mime.extensions;

      if (!exts || !exts.length) {
        return;
      }

      // mime -> extensions
      Object.assign(this.extensions, { [type]: exts });

      // extension -> mime
      for (let i = 0; i < exts.length; i++) {
        const extension = exts[i];
        if (typeSets[exts[i]]) {
          typeSets[exts[i]].push(type);
        } else {
          typeSets[exts[i]] = [type];
        }

        if (types[extension]) {
          const from = preference.indexOf(db[types[extension]].source);
          const to = preference.indexOf(mime.source);

          if (
            types[extension] !== "application/octet-stream" &&
            (from > to ||
              (from === to &&
                types[extension].substr(0, 12) === "application/"))
          ) {
            // skip the remapping
            continue;
          }
        }

        // set the extension -> mime
        types[extension] = type;
      }
    });
  };

  /**
   * Get the default charset for a MIME type.
   *
   * @param {string} type
   * @return {boolean|string}
   */

  getCharset = (type: string): boolean | string => {
    if (!type || typeof type !== "string") {
      return false;
    }

    // TODO: use media-typer
    const match = this.EXTRACT_TYPE_REGEXP.exec(type);
    const mime = match && this.db[match[1].toLowerCase()];

    if (mime && mime.charset) {
      return mime.charset;
    }

    // default text/* to utf-8
    if (match && this.TEXT_TYPE_REGEXP.test(match[1])) {
      return "UTF-8";
    }

    return false;
  };

  /**
   * Create a full Content-Type header given a MIME type or extension.
   *
   * @param {string} str - MIME type or file extension
   * @return {boolean|string}
   */
  getContentType = (str: string): boolean | string => {
    // TODO: should this even be in this module?
    if (!str || typeof str !== "string") {
      return false;
    }

    let mime = str.indexOf("/") === -1 ? this.getMime(str) : str;

    if (!mime) {
      return false;
    }

    // TODO: use content-type or other module
    if ((mime as string).indexOf("charset") === -1) {
      const charset = this.getCharset(mime as string);
      if (charset) mime += "; charset=" + (charset as string).toLowerCase();
    }

    return mime;
  };

  /**
   * Get the default extension for a MIME type.
   *
   * @param {string} type
   * @return {boolean|string}
   */
  getExtension = (type: string): boolean | string => {
    if (!type || typeof type !== "string") {
      return false;
    }

    // TODO: use media-typer
    const match = this.EXTRACT_TYPE_REGEXP.exec(type);

    // get extensions
    const exts = match && this.extensions[match[1].toLowerCase()];

    if (!exts || !exts.length) {
      return false;
    }

    return exts[0];
  };

  /**
   * Lookup the MIME type for a file path/extension.
   *
   * @param {string} path
   * @return {boolean|string}
   */
  getMime = (path: string): boolean | string => {
    if (!path || typeof path !== "string") {
      return false;
    }

    // get the extension ("ext" or ".ext" or full path)
    const extension = this.extname("x." + path)
      .toLowerCase()
      .substring(1);

    if (!extension) {
      return false;
    }

    return this.types[extension] || false;
  };

  /**
   * Find all MIME types that are associated with a file extensions.
   *
   * @param {string} path or file extension
   * @return {boolean|array<string>}
   */
  getMimes = (path: string): boolean | Array<string> => {
    const extension = this.extractExtension(path);

    if (!extension) {
      return false;
    }

    return this.typeSets[extension as string] || false;
  };
}

export default MimeTypes;
