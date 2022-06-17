import { TSystemInfo, TUserInfo, TNetworkInfo, TSceneInfo, TPageParams } from './types/mp';

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

let mp: MP;
export default class MP {
  private _context!: IContext;
  private _appName!: string;
  private _systemInfo!: TSystemInfo; //系统信息
  private _userInfo!: TUserInfo; //用户信息
  private _networkInfo!: TNetworkInfo; //网络信息
  private _sceneInfo!: TSceneInfo; //场景信息
  private _indexPage!: string;
  private _pageParams!: TPageParams; //进入当前页面的query参数

  constructor() { }

  public get context() {
    if (this._context) return this._context;

    if (typeof wx !== 'undefined') {
      this._context = wx;
    }
    if (typeof swan !== 'undefined') {
      this._context = swan;
    }
    if (typeof tt !== 'undefined') {
      this._context = tt;
    }
    if (typeof my !== 'undefined') {
      this._context = my;
    }
    if (typeof qq !== 'undefined') {
      this._context = qq;
    }
    if (typeof qh !== 'undefined') {
      this._context = qh;
    }

    return this._context;
  }

  public get appName() {
    if (this._appName) return this._appName;

    if (typeof wx !== 'undefined') {
      this._appName = 'wx';
    }
    if (typeof swan !== 'undefined') {
      this._appName = 'swan';
    }
    if (typeof tt !== 'undefined') {
      this._appName = 'tt';
    }
    if (typeof my !== 'undefined') {
      this._appName = 'my';
    }
    if (typeof qq !== 'undefined') {
      this._appName = 'qq';
    }
    if (typeof qh !== 'undefined') {
      this._appName = 'qh';
    }

    return this._appName;
  }

  public get systemInfo() {
    if (this._systemInfo) return this._systemInfo;

    this._systemInfo = this._context.getSystemInfoSync();

    if (this._appName === 'my') {
      this._systemInfo.SDKVersion = this._context.SDKVersion || '';
    }
    return this._systemInfo;
  }

  public get userInfo() {
    let self = this;
    if (this._userInfo) return this._userInfo;
    this._context.getUserInfo({
      success: function (res: { userInfo: TUserInfo }) {
        self._userInfo = res.userInfo || {};
      }
    });
    return;
  }

  public async networkInfo() {
    let self = this;
    return new Promise((resolve, reject) => {
      this._context.getNetworkType({
        success: function (res: TNetworkInfo) {
          self._networkInfo = {
            signalStrength: res.signalStrength,
            networkType: res.networkType
          };
          resolve(self._networkInfo);
        },
        fail: function (err: any) {
          reject(err);
        }
      });
    })
  }

  public async getVersionInfo () {
    return new Promise((resolve, reject) => {
      try {
        if (typeof wx !== 'undefined') {
          const accountInfo = wx.getAccountInfoSync();
          resolve(accountInfo.miniProgram.version) // 小程序 appId
        }
        if (typeof swan !== 'undefined') {
          let res = swan.getEnvInfoSync();
          // 基础库 3.140.1 之前，无法判断接口是否调用失败
          // 基础库 3.140.1 及以后，通过 instanceof 来判断接口是否调用失败
          if (!(res instanceof Error)) {
            resolve(res.env)
          }
          else {
            reject(res.message)
          }
        }
        if (typeof tt !== 'undefined') {
          const { microapp } = tt.getEnvInfoSync();
          resolve(microapp.mpVersion)
        }
        if (typeof my !== 'undefined') {
          my.getRunScene({
            success(result) {
              resolve(result.envVersion)
            },
            fail(){
              reject()
            }
          })
        }
        if (typeof qq !== 'undefined') {
          resolve(qq.getEnvVersion())
        }
      } catch (error) {

      }
    })
  }

  public get sceneInfo() {
    return this._sceneInfo;
  }
  public set sceneInfo(sceneInfo: TSceneInfo) {
    this._sceneInfo = sceneInfo;
  }

  public get indexPage() {
    return this._indexPage;
  }
  public set indexPage(indexPage: string) {
    this._indexPage = indexPage;
  }

  public get currentPage() {
    if (this.appName === 'qh') {
      const { path } = $router.history.current;
      return path;
    }
    let pages = getCurrentPages();
    if (pages.length > 0) {
      return pages[pages.length - 1].route;
    } else {
      return this._indexPage;
    }
  }

  public get pageParams() {
    return this._pageParams;
  }
  public set pageParams(data: TPageParams) {
    this._pageParams = data;
  }

  static instance(): MP {
    if (mp) return mp;

    mp = new MP();

    return mp;
  }
}