import { core } from './shared';

import { MiniProgramBackend, MiniProgramOptions } from './backend';

export class MiniProgramClient extends core.BaseClient<MiniProgramBackend, MiniProgramOptions> {
  /**
   *
   * @param options ReactNativeOptions
   */
  public constructor(options: MiniProgramOptions = { url: '' }) {
    super(MiniProgramBackend, options);
  }
}
