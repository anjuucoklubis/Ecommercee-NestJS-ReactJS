const ImageBase64 = () => {
  const DisplayBase64 = (imageData: string) => {
    if (imageData.startsWith("/9j/")) {
      // JPEG
      return `data:image/jpeg;base64,${imageData}`;
    } else if (imageData.startsWith("iVBORw0KGgo")) {
      // PNG
      return `data:image/png;base64,${imageData}`;
    }
    return "";
  };

  return { DisplayBase64 };
};
export default ImageBase64;
