import { assert } from "chai";
import MTypes from "@whykhamist/mime-types";
import { MimeTypes, MimeDb } from "@whykhamist/mime-types";

describe("MimeTypes ESM", () => {
  it("should be an instance of MimeTypes", () => {
    assert.instanceOf(new MimeTypes(MimeDb), MimeTypes);
    assert.instanceOf(MTypes, MimeTypes);
  });

  describe(".getCharset(type)", () => {
    it('should return "UTF-8" for "application/json"', () => {
      assert.strictEqual(MTypes.getCharset("application/json"), "UTF-8");
    });

    it('should return "UTF-8" for "application/json; foo=bar"', () => {
      assert.strictEqual(
        MTypes.getCharset("application/json; foo=bar"),
        "UTF-8"
      );
    });

    it('should return "UTF-8" for "application/javascript"', () => {
      assert.strictEqual(MTypes.getCharset("application/javascript"), "UTF-8");
    });

    it('should return "UTF-8" for "application/JavaScript"', () => {
      assert.strictEqual(MTypes.getCharset("application/JavaScript"), "UTF-8");
    });

    it('should return "UTF-8" for "text/html"', () => {
      assert.strictEqual(MTypes.getCharset("text/html"), "UTF-8");
    });

    it('should return "UTF-8" for "TEXT/HTML"', () => {
      assert.strictEqual(MTypes.getCharset("TEXT/HTML"), "UTF-8");
    });

    it('should return "UTF-8" for any text/*', () => {
      assert.strictEqual(MTypes.getCharset("text/x-bogus"), "UTF-8");
    });

    it("should return false for unknown types", () => {
      assert.strictEqual(MTypes.getCharset("application/x-bogus"), false);
    });

    it("should return false for any application/octet-stream", () => {
      assert.strictEqual(MTypes.getCharset("application/octet-stream"), false);
    });

    it("should return false for invalid arguments", () => {
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getCharset({}), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getCharset(null), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getCharset(true), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getCharset(42), false);
    });
  });

  describe(".getContentType(extension)", () => {
    it('should return content-type for "html"', () => {
      assert.strictEqual(
        MTypes.getContentType("html"),
        "text/html; charset=utf-8"
      );
    });

    it('should return content-type for ".html"', () => {
      assert.strictEqual(
        MTypes.getContentType(".html"),
        "text/html; charset=utf-8"
      );
    });

    it('should return content-type for "jade"', () => {
      assert.strictEqual(
        MTypes.getContentType("jade"),
        "text/jade; charset=utf-8"
      );
    });

    it('should return content-type for "json"', () => {
      assert.strictEqual(
        MTypes.getContentType("json"),
        "application/json; charset=utf-8"
      );
    });

    it("should return false for unknown extensions", () => {
      assert.strictEqual(MTypes.getContentType("bogus"), false);
    });

    it("should return false for invalid arguments", () => {
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getContentType({}), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getContentType(null), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getContentType(true), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getContentType(42), false);
    });
  });

  describe(".getContentType(type)", () => {
    it('should attach charset to "application/json"', () => {
      assert.strictEqual(
        MTypes.getContentType("application/json"),
        "application/json; charset=utf-8"
      );
    });

    it('should attach charset to "application/json; foo=bar"', () => {
      assert.strictEqual(
        MTypes.getContentType("application/json; foo=bar"),
        "application/json; foo=bar; charset=utf-8"
      );
    });

    it('should attach charset to "TEXT/HTML"', () => {
      assert.strictEqual(
        MTypes.getContentType("TEXT/HTML"),
        "TEXT/HTML; charset=utf-8"
      );
    });

    it('should attach charset to "text/html"', () => {
      assert.strictEqual(
        MTypes.getContentType("text/html"),
        "text/html; charset=utf-8"
      );
    });

    it('should not alter "text/html; charset=iso-8859-1"', () => {
      assert.strictEqual(
        MTypes.getContentType("text/html; charset=iso-8859-1"),
        "text/html; charset=iso-8859-1"
      );
    });

    it("should return type for unknown types", () => {
      assert.strictEqual(
        MTypes.getContentType("application/x-bogus"),
        "application/x-bogus"
      );
    });
  });

  describe(".getExtension(type)", () => {
    it("should return extension for mime type", () => {
      assert.strictEqual(MTypes.getExtension("text/html"), "html");
      assert.strictEqual(MTypes.getExtension(" text/html"), "html");
      assert.strictEqual(MTypes.getExtension("text/html "), "html");
    });

    it("should return false for unknown type", () => {
      assert.strictEqual(MTypes.getExtension("application/x-bogus"), false);
    });

    it("should return false for non-type string", () => {
      assert.strictEqual(MTypes.getExtension("bogus"), false);
    });

    it("should return false for non-strings", () => {
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getExtension(null), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getExtension(undefined), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getExtension(42), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getExtension({}), false);
    });

    it("should return extension for mime type with parameters", () => {
      assert.strictEqual(
        MTypes.getExtension("text/html;charset=UTF-8"),
        "html"
      );
      assert.strictEqual(
        MTypes.getExtension("text/HTML; charset=UTF-8"),
        "html"
      );
      assert.strictEqual(
        MTypes.getExtension("text/html; charset=UTF-8"),
        "html"
      );
      assert.strictEqual(
        MTypes.getExtension("text/html; charset=UTF-8 "),
        "html"
      );
      assert.strictEqual(
        MTypes.getExtension("text/html ; charset=UTF-8"),
        "html"
      );
    });
  });

  describe(".getMime(extension)", () => {
    it('should return mime type for ".html"', () => {
      assert.strictEqual(MTypes.getMime(".html"), "text/html");
    });

    it('should return mime type for ".js"', () => {
      assert.strictEqual(MTypes.getMime(".js"), "text/javascript");
    });

    it('should return mime type for ".json"', () => {
      assert.strictEqual(MTypes.getMime(".json"), "application/json");
    });

    it('should return mime type for ".rtf"', () => {
      assert.strictEqual(MTypes.getMime(".rtf"), "application/rtf");
    });

    it('should return mime type for ".txt"', () => {
      assert.strictEqual(MTypes.getMime(".txt"), "text/plain");
    });

    it('should return mime type for ".xml"', () => {
      assert.strictEqual(MTypes.getMime(".xml"), "application/xml");
    });

    it("should work without the leading dot", () => {
      assert.strictEqual(MTypes.getMime("html"), "text/html");
      assert.strictEqual(MTypes.getMime("xml"), "application/xml");
    });

    it("should be case insensitive", () => {
      assert.strictEqual(MTypes.getMime("HTML"), "text/html");
      assert.strictEqual(MTypes.getMime(".Xml"), "application/xml");
    });

    it("should return false for unknown extension", () => {
      assert.strictEqual(MTypes.getMime(".bogus"), false);
      assert.strictEqual(MTypes.getMime("bogus"), false);
    });

    it("should return false for non-strings", () => {
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMime(null), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMime(undefined), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMime(42), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMime({}), false);
    });
  });

  describe(".getMime(path)", () => {
    it("should return mime type for file name", () => {
      assert.strictEqual(MTypes.getMime("page.html"), "text/html");
    });

    it("should return mime type for relative path", () => {
      assert.strictEqual(MTypes.getMime("path/to/page.html"), "text/html");
      assert.strictEqual(MTypes.getMime("path\\to\\page.html"), "text/html");
    });

    it("should return mime type for absolute path", () => {
      assert.strictEqual(MTypes.getMime("/path/to/page.html"), "text/html");
      assert.strictEqual(
        MTypes.getMime("C:\\path\\to\\page.html"),
        "text/html"
      );
    });

    it("should be case insensitive", () => {
      assert.strictEqual(MTypes.getMime("/path/to/PAGE.HTML"), "text/html");
      assert.strictEqual(
        MTypes.getMime("C:\\path\\to\\PAGE.HTML"),
        "text/html"
      );
    });

    it("should return false for unknown extension", () => {
      assert.strictEqual(MTypes.getMime("/path/to/file.bogus"), false);
    });

    it("should return false for path without extension", () => {
      assert.strictEqual(MTypes.getMime("/path/to/json"), false);
    });

    describe("path with dotfile", () => {
      it("should return false when extension-less", () => {
        assert.strictEqual(MTypes.getMime("/path/to/json"), false);
      });

      it("should return mime type when there is extension", () => {
        assert.strictEqual(
          MTypes.getMime("/path/to/.config.json"),
          "application/json"
        );
      });

      it("should return mime type when there is extension, but no path", () => {
        assert.strictEqual(MTypes.getMime(".config.json"), "application/json");
      });
    });
  });

  describe(".getMimes(extension)", () => {
    it("should return array of mime types ", () => {
      assert.sameDeepMembers(MTypes.getMimes("mp3") as Array<string>, [
        "audio/mpeg",
        "audio/mp3",
      ]);
      assert.sameDeepMembers(MTypes.getMimes(".rtf") as Array<string>, [
        "application/rtf",
        "text/rtf",
      ]);
      assert.sameDeepMembers(MTypes.getMimes(".bmp") as Array<string>, [
        "image/x-ms-bmp",
        "image/bmp",
      ]);
    });
  });

  describe(".getMimes(path)", () => {
    it("should return array of mime types ", () => {
      assert.sameDeepMembers(
        MTypes.getMimes("path/to/file.mp3") as Array<string>,
        ["audio/mpeg", "audio/mp3"]
      );
      assert.sameDeepMembers(
        MTypes.getMimes("path\\to\\file.rtf") as Array<string>,
        ["application/rtf", "text/rtf"]
      );
      assert.sameDeepMembers(
        MTypes.getMimes("C:/path/to/file.bmp") as Array<string>,
        ["image/x-ms-bmp", "image/bmp"]
      );
    });
    it("should return false when extension-less", () => {
      assert.strictEqual(MTypes.getMimes("/path/to/json"), false);
    });
    it("should return false for non-strings", () => {
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMimes(null), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMimes(undefined), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMimes(42), false);
      // @ts-expect-error function expects string as param.
      assert.strictEqual(MTypes.getMimes({}), false);
    });
  });
});
