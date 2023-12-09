import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import path from 'path';

@Injectable()
export class FilesService {
  findOneStaticFile(folder: string, fileName: string) {
    const filePath = path.join(
      __dirname,
      `../../static/public/${folder}/${fileName}`,
    );
    if (!existsSync(filePath))
      throw new NotFoundException(`File: ${fileName} not found`);

    return filePath;
  }
}
