export const isFullUrl = (url: string) => ({
  isFullUrl: /^https?:\/\//.test(url),
});
