import { Injectable } from '@nestjs/common';
import { GenerateIdAdapterT } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GenerateIdAdapter implements GenerateIdAdapterT {
  generate() {
    return uuid();
  }
}
