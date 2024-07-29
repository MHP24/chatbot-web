import { Injectable } from '@nestjs/common';
import { ActionI, ActionsCreator } from '../../interfaces';
import { ContactAction } from './services/contact.service';

@Injectable()
export class ActionsFactory implements ActionsCreator {
  constructor(private readonly contactAction: ContactAction) {}

  handleActionsCreation(action: string): ActionI {
    const actions: Record<string, ActionI> = {
      contact: this.contactAction,
    };

    const actionInstance = actions[action];
    if (!actionInstance) {
      throw new Error(`Error: action ${action} not supported`);
    }

    return actionInstance;
  }
}
