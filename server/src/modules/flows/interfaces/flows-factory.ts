import { Flow } from '../types';
import { FlowI } from './flow';

export interface FlowsCreator {
  handleFlowCreation(flow: Flow): FlowI;
}
