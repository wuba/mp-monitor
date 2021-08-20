import './globalfix';

import { core } from './shared';

import { MiniProgramOptions } from './backend';
import { MiniProgramClient } from './client';
import { Common, ApiError, GlobalHandlers, ResourceErrorIntegration, MPTracing } from './integrations';

const { initAndBind } = core;

/**
 * 内部插件集合, 暂时不考虑外部情况
 */
const defaultIntegrations = [
  new Common(), // event 公共信息添加
  new GlobalHandlers(),
  new ApiError(), // 接口错误
  new ResourceErrorIntegration(), // 错误资源
  new MPTracing() // 性能
];

/**
 * Beidou初始化调用处理
 */
export function init(options: MiniProgramOptions = { url: '' }): void {
  options.isDebug = true;
  options.isProd = true;

  options.defaultIntegrations = defaultIntegrations;

  initAndBind(MiniProgramClient, options);
}
