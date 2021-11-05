/*
 * @file 处理event公共信息
 * */
import { API, core, Event, Integration, IPerformance, Resource, utils } from '../shared';

import MP from '../mp';
import { SDK_NAME, SDK_VERSION } from '../version';

const { uuid4, logger } = utils;
const { getCurrentHub, addGlobalEventProcessor } = core;

let uuid: string;

function singleUUID(): string {
  if (uuid) return uuid;

  return (uuid = uuid4());
}

function parseData<T>(data: T[] = []): T[] {
  return data.map((item) => ({
    eventId: uuid4(),
    ...item,
    timestamp: Date.now(),
  }));
}

export class Common implements Integration {
  /**
 * @inheritDoc
 */
  public static id: string = 'Common';

  /**
   * @inheritDoc
   */
  public name: string = Common.id;

  /**
   * @inheritDoc
   */
  public setupOnce = (): void => {
    const client = getCurrentHub().getClient() || {
      getOptions() {
        return {
          projectId: '',
        };
      },
    };
    const { projectId } = client.getOptions();

    addGlobalEventProcessor((event: Event) => {
      try {
        event.projectId = projectId;
        event.sdk = {
          name: SDK_NAME,
          version: SDK_VERSION,
        };
        let mpInstance = MP.instance();
        const systemInfo: any = mpInstance.systemInfo || '';
        const networkInfo: any = mpInstance.networkInfo || '';
        const sceneInfo: any = mpInstance.sceneInfo || '';
        const userInfo: any = mpInstance.userInfo || '';
        event.request = {
          url: mpInstance.currentPage,
          headers: {
            appName: mpInstance.appName,
            appVersion: systemInfo.version, //微信版本号
            appSDKVersion: systemInfo.SDKVersion, //客户端基础库版本
            imei: singleUUID(),
            uuid: singleUUID(),
            pid: singleUUID(),
            os: systemInfo.system.split(' ')[0], //操作系统
            osv: systemInfo.system.split(' ')[1], //操作系统版本
            device: systemInfo.model, //设备型号
            brand: systemInfo.brand, //设备品牌
            benchmarkLevel: systemInfo.benchmarkLevel, //设备性能等级（仅Android）
            host: systemInfo.host, //当前小程序运行的宿主环境
            apn: networkInfo !== '' ? networkInfo.networkType : '',
            scene: sceneInfo !== '' ? sceneInfo.scene : '', //场景值
            systemInfo: encodeURIComponent(JSON.stringify(systemInfo)), //系统信息
            userInfo: encodeURIComponent(JSON.stringify(userInfo)), //用户信息
            networkInfo: encodeURIComponent(JSON.stringify(networkInfo)), //网络信息
            sceneInfo: encodeURIComponent(JSON.stringify(sceneInfo)),
          },
        };
        event.apis && (event.apis = parseData<API>(event.apis));
        event.resources && (event.resources = parseData<Resource>(event.resources));
        event.performances && (event.performances = parseData<IPerformance>(event.performances));
      } catch (e) {
        logger.warn('get commom error ');
      }

      return event;
    });
  }
}
