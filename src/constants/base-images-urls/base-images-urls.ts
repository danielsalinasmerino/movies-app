const BASE_IMAGES_URLS = {
  TMDB: {
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
} as const;

type BaseImagesUrls = keyof typeof BASE_IMAGES_URLS;

const BaseImagesUrlsEnum: Record<BaseImagesUrls, string> = Object.fromEntries(
  Object.entries(BASE_IMAGES_URLS).map(([key, value]) => [key, value.baseUrl])
) as Record<BaseImagesUrls, string>;

export type { BaseImagesUrls };
export { BaseImagesUrlsEnum };
