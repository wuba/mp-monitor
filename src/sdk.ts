import './globalfix';

import { MiniProgramOptions } from './backend';
import { MiniProgramClient } from './client';
import {
    ApiError, Common, GlobalHandlers, MPTracing, ResourceErrorIntegration
} from './integrations';
import { core } from './shared';

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
 * 初始化调用处理
 */
export function init(options: MiniProgramOptions = { url: '' }): void {
  options.isDebug = true;
  options.isProd = true;

  options.defaultIntegrations = defaultIntegrations;

  initAndBind(MiniProgramClient, options);
}
