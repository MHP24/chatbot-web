import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionService {
  handleOption() {
    console.log('Handle option');
  }
}
