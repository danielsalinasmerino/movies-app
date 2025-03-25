// TODO: Avoid booleans without context => better: {isFullUrl: /^https?:\/\//.test(url)}
export const isFullUrl = (url: string) => /^https?:\/\//.test(url);
