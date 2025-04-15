async function saveImage(file: File): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return `/static/users/${file.originalFilename}.png`;
}
