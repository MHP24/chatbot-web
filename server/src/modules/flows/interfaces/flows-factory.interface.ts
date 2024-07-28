import { Flow } from '../types';
import { FlowI } from './flow.interface';

export interface FlowsCreator {
  handleFlowCreation(flow: Flow): FlowI;
}
