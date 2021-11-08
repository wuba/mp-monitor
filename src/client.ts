import { MiniProgramBackend, MiniProgramOptions } from './backend';
import { core } from './shared';

export class MiniProgramClient extends core.BaseClient<MiniProgramBackend, MiniProgramOptions> {
  /**
   *
   * @param options ReactNativeOptions
   */
  public constructor(options: MiniProgramOptions = { url: '' }) {
    super(MiniProgramBackend, options);
  }
}
