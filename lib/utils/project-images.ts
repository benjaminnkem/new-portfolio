export const isMobileScreenshot = (src: string) => {
  const filename = src.split("/").pop() ?? "";
  return filename.toLowerCase().startsWith("mobile_");
};

export const splitProjectImages = (images: string[]) => ({
  web: images.filter((src) => !isMobileScreenshot(src)),
  mobile: images.filter(isMobileScreenshot),
});

export const getProjectCoverImage = (images: string[]) => {
  const { web } = splitProjectImages(images);
  return web[0] ?? images[0];
};