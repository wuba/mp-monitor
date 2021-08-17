declare var wx: object; // 微信小程序
declare var swan: object; // 百度小程序
declare var tt: object; // 头条小程序
declare var my: object; // 支付宝小程序
declare var qq: object; // QQ小程序
declare var qh: object; // 360小程序

declare var getCurrentPages: (message?: any) => Array<any>;

/**
 * 应用级事件 基础库>2.1.2
 * wx.onUnhandledRejection(function callback) -> App.onUnhandledRejection 监听未处理的 Promise 拒绝事件
 * wx.onAppShow -> App.onShow 监听小程序切前台事件
 * wx.onPageNotFound -> App.onPageNotFound 监听小程序要打开的页面不存在事件
 * wx.onError -> App.onError 监听小程序错误事件。如脚本错误或 API 调用报错等
 * wx.onAppHide -> App.onHide 监听小程序切后台事件
 * wx.getLaunchOptionsSync -> App.onLaunch 获取小程序启动时的参数
 */
export const APP_LIFE_CYCLE = ['onLaunch', 'onShow'];
export const PAGE_LIFE_CYCLE = ['onLoad', 'onShow', 'onReady', 'onHide'];

// @ts-ignore
let mp: MP = null;
export default class MP {
  private context: any;
  private appName: any;
  private systemInfo: any;
  private userInfo: any;
  private network: any;
  private scene: any;
  private indexPage: string;

  constructor() {
    this.context = null;
    this.appName = null;
    this.network = null;
    this.systemInfo = null;
    this.userInfo = null;
    this.scene = {};
    this.indexPage = 'unknown';
    this.getContext();
    this.getAppName();
    this.getSystemInfo();
    this.getUserInfo();
    this.getNetworkInfo();
  }

  public getContext() {
    if (this.context) return this.context;

    if (typeof wx !== 'undefined') {
      this.context = wx;
    }
    if (typeof swan !== 'undefined') {
      this.context = swan;
    }
    if (typeof tt !== 'undefined') {
      this.context = tt;
    }
    if (typeof my !== 'undefined') {
      this.context = my;
    }
    if (typeof qq !== 'undefined') {
      this.context = qq;
    }
    if (typeof qh !== 'undefined') {
      this.context = qh;
    }
  }

  public getAppName() {
    if (this.appName) return this.appName;

    if (typeof wx !== 'undefined') {
      this.appName = 'wx';
    }
    if (typeof swan !== 'undefined') {
      this.appName = 'swan';
    }
    if (typeof tt !== 'undefined') {
      this.appName = 'tt';
    }
    if (typeof my !== 'undefined') {
      this.appName = 'my';
    }
    if (typeof qq !== 'undefined') {
      this.appName = 'qq';
    }
    if (typeof qh !== 'undefined') {
      this.appName = 'qh';
    }
  }

  /**
   * 获取页面层级页面路径
   * @returns
   */
  public getCurrentPages() {
    try {
      if (typeof getCurrentPages === 'function') {
        const pages = getCurrentPages();
        console.log(pages);
        return pages[pages.length - 1].route;
      }
      console.warn('getCurrentPages is not function in global');
      return 'unknow';
    } catch (error) {
      return 'unknow';
    }
  }

  /**
   * 获取系统信息
   */
  public getSystemInfo() {
    if (this.systemInfo) return this.systemInfo;

    this.systemInfo = this.context.getSystemInfoSync();
    return this.systemInfo;
  }

  /**
   * 获取用户信息
   */
  public getUserInfo() {
    if (this.userInfo) return this.userInfo;
    let self = this;
    this.context.getUserInfo({
      success: function (res: any) {
        self.userInfo = res.userInfo || {};
      }
    });
  }

  /**
   * 获取网络信息
   */
  public getNetworkInfo() {
    let self = this;
    if (this.network) return this.network;
    this.context.getNetworkType({
      success: function (res: any) {
        self.network = {
          signalStrength: res.signalStrength, //信号强弱
          networkType: res.networkType //网络类型
        };
      }
    });
  }

  public setIndexPage(path: string) {
    this.indexPage = path;
  }

  public getIndexPage() {
    return this.indexPage;
  }

  public setScene(scene: any) {
    this.scene = scene;
  }

  public getScene() {
    return this.scene;
  }

  static instance(): MP {
    if (mp) return mp;

    mp = new MP();

    return mp;
  }
}