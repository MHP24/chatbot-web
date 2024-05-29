import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { GetFileDto } from './dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/:directory/:file')
  getFile(@Res() res: Response, @Param() getFileDto: GetFileDto) {
    return res.sendFile(this.filesService.getFile(getFileDto));
  }
}
