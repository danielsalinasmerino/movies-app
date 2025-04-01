import { isFullUrl } from "@/utils/url";

describe("isFullUrl", () => {
  test("should return { isFullUrl: true } for valid absolute URLs", () => {
    expect(isFullUrl("https://example.com")).toEqual({ isFullUrl: true });
    expect(isFullUrl("http://example.com")).toEqual({ isFullUrl: true });
    expect(isFullUrl("https://example.com/path")).toEqual({ isFullUrl: true });
    expect(isFullUrl("http://sub.domain.com")).toEqual({ isFullUrl: true });
  });

  test("should return { isFullUrl: false } for relative URLs", () => {
    expect(isFullUrl("/image.jpg")).toEqual({ isFullUrl: false });
    expect(isFullUrl("image.jpg")).toEqual({ isFullUrl: false });
    expect(isFullUrl("./image.jpg")).toEqual({ isFullUrl: false });
    expect(isFullUrl("../image.jpg")).toEqual({ isFullUrl: false });
  });

  test("should return { isFullUrl: false } for empty strings", () => {
    expect(isFullUrl("")).toEqual({ isFullUrl: false });
  });

  test("should return { isFullUrl: false } for non-string values", () => {
    expect(isFullUrl(undefined as unknown as string)).toEqual({
      isFullUrl: false,
    });
    expect(isFullUrl(null as unknown as string)).toEqual({ isFullUrl: false });
    expect(isFullUrl(123 as unknown as string)).toEqual({ isFullUrl: false });
    expect(isFullUrl({} as unknown as string)).toEqual({ isFullUrl: false });
  });
});
