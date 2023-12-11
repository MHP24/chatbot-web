import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/static/:folder/:fileName')
  findOne(
    @Res() res: Response,
    @Param('folder') folder: string,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(this.filesService.findOneStaticFile(folder, fileName));
  }

  @Get('/scripts/:folder/:fileName')
  find(
    @Res() res: Response,
    @Param('folder') folder: string,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(this.filesService.getScript(folder, fileName));
  }
}
