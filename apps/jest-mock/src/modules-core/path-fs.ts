import { readFileSync } from 'fs';
import { join } from "path";



export const readFileFromDisk = () => {
  const filePath = join(__dirname, 'file.txt');
  const test = readFileSync(filePath, 'utf-8');

  return {
    path: filePath,
    value: test,
  };
}
