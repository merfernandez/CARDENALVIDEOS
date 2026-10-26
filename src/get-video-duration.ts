import { ALL_FORMATS, Input, UrlSource } from "mediabunny";

export const getVideoDurationInSeconds = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, { getRetryDelay: () => null }),
  });
  try {
    return await input.computeDuration();
  } finally {
    input.dispose();
  }
};
