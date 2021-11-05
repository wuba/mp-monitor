import { Integration, Options } from '../types';
import { addGlobalEventProcessor, getCurrentHub } from '../hub';
import { logger } from '../utils';

export const installedIntegrations: string[] = [];

/** Map of integrations assigned to a client */
export interface IntegrationIndex {
  [key: string]: Integration;
}

/** Setup given integration */
export function setupIntegration(integration: Integration): void {
  if (installedIntegrations.indexOf(integration.name) !== -1) {
    return;
  }
  integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
  installedIntegrations.push(integration.name);
  logger.log(`Integration installed: ${integration.name}`);
}

export function setupIntegrations<O extends Options>(options: O): IntegrationIndex {
  const integrations: IntegrationIndex = {};
  if (Array.isArray(options.defaultIntegrations) && options.defaultIntegrations.length) {
    options.defaultIntegrations.forEach(integration => {
      integrations[integration.name] = integration;
      setupIntegration(integration);
    });
  }
  return integrations;
}
