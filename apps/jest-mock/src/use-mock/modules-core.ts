import fs from 'fs';
import path from 'path';

export const readFileFromDisk = () => {
  const filePath = path.join(__dirname, 'file.txt');
  const test = fs.readFileSync(filePath, 'utf-8');

  return {
    path: filePath,
    value: test,
  };
}
