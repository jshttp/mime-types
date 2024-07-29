import { MimeDatabase } from "mime-db";
import MimeTypes from "./mime-types";
import db from "mime-db/db.json";

const instance = new MimeTypes(db as MimeDatabase);
const {
  types,
  extensions,
  typeSets,

  getCharset,
  getContentType,
  getExtension,
  getMime,
  getMimes,
} = instance;
export {
  MimeTypes,
  db as MimeDb,
  types,
  extensions,
  typeSets,
  getCharset,
  getContentType,
  getExtension,
  getMime,
  getMimes,
};
export default instance;
