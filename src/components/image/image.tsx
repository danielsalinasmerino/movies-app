import NextImage, { ImageProps as NextImageProps } from "next/image";

import { BaseImagesUrls, BaseImagesUrlsEnum } from "@/constants";
import { isFullUrl } from "@/utils/url";

type ImageProps = NextImageProps & {
  baseImageUrl?: BaseImagesUrls;
};

const Image = ({ baseImageUrl, src, ...props }: ImageProps) => {
  if (!src) return null;

  const isStringSrc = typeof src === "string";
  const { isFullUrl: srcIsFullUrl } = isFullUrl(isStringSrc ? src : "");

  const finalSrc =
    isStringSrc && baseImageUrl && !srcIsFullUrl
      ? `${BaseImagesUrlsEnum[baseImageUrl] ?? ""}${src}`
      : src;

  return <NextImage src={finalSrc} {...props} />;
};

export default Image;
