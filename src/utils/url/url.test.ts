import { isFullUrl } from "@/utils/url";

describe("isFullUrl", () => {
  test("should return true for valid absolute URLs", () => {
    expect(isFullUrl("https://example.com")).toBe(true);
    expect(isFullUrl("http://example.com")).toBe(true);
    expect(isFullUrl("https://example.com/path")).toBe(true);
    expect(isFullUrl("http://sub.domain.com")).toBe(true);
  });

  test("should return false for relative URLs", () => {
    expect(isFullUrl("/image.jpg")).toBe(false);
    expect(isFullUrl("image.jpg")).toBe(false);
    expect(isFullUrl("./image.jpg")).toBe(false);
    expect(isFullUrl("../image.jpg")).toBe(false);
  });

  test("should return false for empty strings", () => {
    expect(isFullUrl("")).toBe(false);
  });

  test("should return false for non-string values", () => {
    expect(isFullUrl(undefined as unknown as string)).toBe(false);
    expect(isFullUrl(null as unknown as string)).toBe(false);
    expect(isFullUrl(123 as unknown as string)).toBe(false);
    expect(isFullUrl({} as unknown as string)).toBe(false);
  });
});
