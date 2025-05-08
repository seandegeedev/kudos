import fs from 'fs';
import path from 'path';

const mediaDirectory = path.join(__dirname, '..', '..', '..', '..', '..', 'media');
const avatarsDirectory = path.join(mediaDirectory, 'avatars');

export const deleteAvatar = async (filename: string): Promise<void> => {
  const filePath = path.join(avatarsDirectory, filename);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    throw new Error(`Failed to delete avatar: ${error}`);
  }
};

export default {
  deleteAvatar,
};
