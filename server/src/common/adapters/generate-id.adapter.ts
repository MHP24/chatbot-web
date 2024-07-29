import { GenerateIdAdapterI } from './interfaces';
import { v4 as uuid } from 'uuid';

export class GenerateIdAdapter implements GenerateIdAdapterI {
  generate() {
    return uuid();
  }
}
