import { Injectable } from '@nestjs/common';

@Injectable()
export class InputService {
  handleInput() {
    console.log('Handle input');
  }
}
