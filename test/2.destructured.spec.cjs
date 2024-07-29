/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const assert = require("chai").assert;
const {
  getCharset,
  getContentType,
  getExtension,
  getMime,
  getMimes,
} = require("@whykhamist/mime-types");

describe("MimeTypes CJS", () => {
  describe(".getCharset(type)", () => {
    it('should return "UTF-8" for "application/json"', () => {
      assert.strictEqual(getCharset("application/json"), "UTF-8");
    });

    it('should return "UTF-8" for "application/json; foo=bar"', () => {
      assert.strictEqual(getCharset("application/json; foo=bar"), "UTF-8");
    });

    it('should return "UTF-8" for "application/javascript"', () => {
      assert.strictEqual(getCharset("application/javascript"), "UTF-8");
    });

    it('should return "UTF-8" for "application/JavaScript"', () => {
      assert.strictEqual(getCharset("application/JavaScript"), "UTF-8");
    });

    it('should return "UTF-8" for "text/html"', () => {
      assert.strictEqual(getCharset("text/html"), "UTF-8");
    });

    it('should return "UTF-8" for "TEXT/HTML"', () => {
      assert.strictEqual(getCharset("TEXT/HTML"), "UTF-8");
    });

    it('should return "UTF-8" for any text/*', () => {
      assert.strictEqual(getCharset("text/x-bogus"), "UTF-8");
    });

    it("should return false for unknown types", () => {
      assert.strictEqual(getCharset("application/x-bogus"), false);
    });

    it("should return false for any application/octet-stream", () => {
      assert.strictEqual(getCharset("application/octet-stream"), false);
    });

    it("should return false for invalid arguments", () => {
      assert.strictEqual(getCharset({}), false);
      assert.strictEqual(getCharset(null), false);
      assert.strictEqual(getCharset(true), false);
      assert.strictEqual(getCharset(42), false);
    });
  });

  describe(".getContentType(extension)", () => {
    it('should return content-type for "html"', () => {
      assert.strictEqual(getContentType("html"), "text/html; charset=utf-8");
    });

    it('should return content-type for ".html"', () => {
      assert.strictEqual(getContentType(".html"), "text/html; charset=utf-8");
    });

    it('should return content-type for "jade"', () => {
      assert.strictEqual(getContentType("jade"), "text/jade; charset=utf-8");
    });

    it('should return content-type for "json"', () => {
      assert.strictEqual(
        getContentType("json"),
        "application/json; charset=utf-8"
      );
    });

    it("should return false for unknown extensions", () => {
      assert.strictEqual(getContentType("bogus"), false);
    });

    it("should return false for invalid arguments", () => {
      assert.strictEqual(getContentType({}), false);
      assert.strictEqual(getContentType(null), false);
      assert.strictEqual(getContentType(true), false);
      assert.strictEqual(getContentType(42), false);
    });
  });

  describe(".getContentType(type)", () => {
    it('should attach charset to "application/json"', () => {
      assert.strictEqual(
        getContentType("application/json"),
        "application/json; charset=utf-8"
      );
    });

    it('should attach charset to "application/json; foo=bar"', () => {
      assert.strictEqual(
        getContentType("application/json; foo=bar"),
        "application/json; foo=bar; charset=utf-8"
      );
    });

    it('should attach charset to "TEXT/HTML"', () => {
      assert.strictEqual(
        getContentType("TEXT/HTML"),
        "TEXT/HTML; charset=utf-8"
      );
    });

    it('should attach charset to "text/html"', () => {
      assert.strictEqual(
        getContentType("text/html"),
        "text/html; charset=utf-8"
      );
    });

    it('should not alter "text/html; charset=iso-8859-1"', () => {
      assert.strictEqual(
        getContentType("text/html; charset=iso-8859-1"),
        "text/html; charset=iso-8859-1"
      );
    });

    it("should return type for unknown types", () => {
      assert.strictEqual(
        getContentType("application/x-bogus"),
        "application/x-bogus"
      );
    });
  });

  describe(".getExtension(type)", () => {
    it("should return extension for mime type", () => {
      assert.strictEqual(getExtension("text/html"), "html");
      assert.strictEqual(getExtension(" text/html"), "html");
      assert.strictEqual(getExtension("text/html "), "html");
    });

    it("should return false for unknown type", () => {
      assert.strictEqual(getExtension("application/x-bogus"), false);
    });

    it("should return false for non-type string", () => {
      assert.strictEqual(getExtension("bogus"), false);
    });

    it("should return false for non-strings", () => {
      assert.strictEqual(getExtension(null), false);

      assert.strictEqual(getExtension(undefined), false);

      assert.strictEqual(getExtension(42), false);

      assert.strictEqual(getExtension({}), false);
    });

    it("should return extension for mime type with parameters", () => {
      assert.strictEqual(getExtension("text/html;charset=UTF-8"), "html");
      assert.strictEqual(getExtension("text/HTML; charset=UTF-8"), "html");
      assert.strictEqual(getExtension("text/html; charset=UTF-8"), "html");
      assert.strictEqual(getExtension("text/html; charset=UTF-8 "), "html");
      assert.strictEqual(getExtension("text/html ; charset=UTF-8"), "html");
    });
  });

  describe(".getMime(extension)", () => {
    it('should return mime type for ".html"', () => {
      assert.strictEqual(getMime(".html"), "text/html");
    });

    it('should return mime type for ".js"', () => {
      assert.strictEqual(getMime(".js"), "text/javascript");
    });

    it('should return mime type for ".json"', () => {
      assert.strictEqual(getMime(".json"), "application/json");
    });

    it('should return mime type for ".rtf"', () => {
      assert.strictEqual(getMime(".rtf"), "application/rtf");
    });

    it('should return mime type for ".txt"', () => {
      assert.strictEqual(getMime(".txt"), "text/plain");
    });

    it('should return mime type for ".xml"', () => {
      assert.strictEqual(getMime(".xml"), "application/xml");
    });

    it("should work without the leading dot", () => {
      assert.strictEqual(getMime("html"), "text/html");
      assert.strictEqual(getMime("xml"), "application/xml");
    });

    it("should be case insensitive", () => {
      assert.strictEqual(getMime("HTML"), "text/html");
      assert.strictEqual(getMime(".Xml"), "application/xml");
    });

    it("should return false for unknown extension", () => {
      assert.strictEqual(getMime(".bogus"), false);
      assert.strictEqual(getMime("bogus"), false);
    });

    it("should return false for non-strings", () => {
      assert.strictEqual(getMime(null), false);
      assert.strictEqual(getMime(undefined), false);
      assert.strictEqual(getMime(42), false);
      assert.strictEqual(getMime({}), false);
    });
  });

  describe(".getMime(path)", () => {
    it("should return mime type for file name", () => {
      assert.strictEqual(getMime("page.html"), "text/html");
    });

    it("should return mime type for relative path", () => {
      assert.strictEqual(getMime("path/to/page.html"), "text/html");
      assert.strictEqual(getMime("path\\to\\page.html"), "text/html");
    });

    it("should return mime type for absolute path", () => {
      assert.strictEqual(getMime("/path/to/page.html"), "text/html");
      assert.strictEqual(getMime("C:\\path\\to\\page.html"), "text/html");
    });

    it("should be case insensitive", () => {
      assert.strictEqual(getMime("/path/to/PAGE.HTML"), "text/html");
      assert.strictEqual(getMime("C:\\path\\to\\PAGE.HTML"), "text/html");
    });

    it("should return false for unknown extension", () => {
      assert.strictEqual(getMime("/path/to/file.bogus"), false);
    });

    it("should return false for path without extension", () => {
      assert.strictEqual(getMime("/path/to/json"), false);
    });

    describe("path with dotfile", () => {
      it("should return false when extension-less", () => {
        assert.strictEqual(getMime("/path/to/json"), false);
      });

      it("should return mime type when there is extension", () => {
        assert.strictEqual(
          getMime("/path/to/.config.json"),
          "application/json"
        );
      });

      it("should return mime type when there is extension, but no path", () => {
        assert.strictEqual(getMime(".config.json"), "application/json");
      });
    });
  });

  describe(".getMimes(extension)", () => {
    it("should return array of mime types ", () => {
      assert.sameDeepMembers(getMimes("mp3"), ["audio/mpeg", "audio/mp3"]);
      assert.sameDeepMembers(getMimes(".rtf"), ["application/rtf", "text/rtf"]);
      assert.sameDeepMembers(getMimes(".bmp"), ["image/x-ms-bmp", "image/bmp"]);
    });
  });

  describe(".getMimes(path)", () => {
    it("should return array of mime types ", () => {
      assert.sameDeepMembers(getMimes("path/to/file.mp3"), [
        "audio/mpeg",
        "audio/mp3",
      ]);
      assert.sameDeepMembers(getMimes("path\\to\\file.rtf"), [
        "application/rtf",
        "text/rtf",
      ]);
      assert.sameDeepMembers(getMimes("c:\\path/to/file.bmp"), [
        "image/x-ms-bmp",
        "image/bmp",
      ]);
    });
    it("should return false when extension-less", () => {
      assert.strictEqual(getMimes("/path/to/json"), false);
    });
    it("should return false for non-strings", () => {
      assert.strictEqual(getMimes(null), false);
      assert.strictEqual(getMimes(undefined), false);
      assert.strictEqual(getMimes(42), false);
      assert.strictEqual(getMimes({}), false);
    });
  });
});
