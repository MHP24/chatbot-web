import { FlowEntry, FlowResponse } from '../types';

export interface FlowI<T = unknown> {
  handleFlow(data: FlowEntry<T>): Promise<FlowResponse>;
}
