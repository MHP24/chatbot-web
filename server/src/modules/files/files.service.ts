import { existsSync } from 'fs';
import path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFileDto } from './dto';

@Injectable()
export class FilesService {
  getFile({ directory, file }: GetFileDto) {
    const filePath = path.join(
      __dirname,
      `../../../static/${directory}/${file}`,
    );
    if (!existsSync(filePath))
      throw new NotFoundException(`File: ${file} not found`);

    return filePath;
  }
}
