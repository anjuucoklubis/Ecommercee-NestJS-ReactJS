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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          const base64String = fileReader.result as string;
          const base64Data = base64String.split(",")[1];
          resolve(base64Data);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return { DisplayBase64, convertToBase64 };
};
export default ImageBase64;
