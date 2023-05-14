import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFilename = uuidv4() + `.${fileExtension}`;
    const fileStream = fs.createWriteStream(`public/${uniqueFilename}`);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => {
        reject(error);
      });
      fileStream.on('finish', () => {
        resolve(uniqueFilename);
      });
      fileStream.end(file.buffer);
    });
  }

  async saveFiles(files: Express.Multer.File[]): Promise<string[]> {
    const promises = files.map((file) => this.saveFile(file));
    return Promise.all(promises);
  }
}
