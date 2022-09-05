import ReSizer from 'react-image-file-resizer';

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    ReSizer.imageFileResizer(
      file,
      1024,
      1024,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });
