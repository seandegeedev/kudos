import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const createUploader = (destination: string) => {
  // path-to-repo/media/destination
  const destinationDirectory = path.join(__dirname, '..', '..', '..', '..', 'media', destination);

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, destinationDirectory);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);

      // Generate a unique filename using the current timestamp and a random number
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

      cb(null, filename);
    },
  });

  return multer({
    storage,
  });
};
