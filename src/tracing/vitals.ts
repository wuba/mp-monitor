import { core } from '../shared';
import MP, { APP_LIFE_CYCLE, PAGE_LIFE_CYCLE } from '../mp';
import { Transaction } from './transaction';
import { addNavigationSpans } from './metrics'
import { addAppContexts } from './context'
import { BeiDouTimeLine } from '../types/tracing';

// @ts-ignore
let vitals: MPVitals = null;
const { getCurrentHub } = core;

export interface Record {
  layoutTime: number,
  extra: {
    name: string,
    scene: string
  }
}
declare var App: (obj: object) => void;
declare var Page: (obj: object) => void;
declare var Component: (obj: object) => void;

export class MPVitals {

  private __TIMELINE__: BeiDouTimeLine;

  private _appLanch: Record;

  private _fpDown: boolean;

  constructor() {
    //@ts-ignore
    this.__TIMELINE__ = {
      in: Date.now() || new Date().getTime()
    };
    // @ts-ignore
    this._appLanch = {};

    this._fpDown = false;

    this.interceptApp();
    this.interceptPage();
  }

  private interceptApp = (): void => {
    let self = this;
    let mpInstance = MP.instance();
    const primaryApp = App;
    App = (obj: any) => {
      APP_LIFE_CYCLE.forEach(name => {
        const primaryHookFn = obj[name];
        obj[name] = function (info: any) {
          if (!mpInstance.indexPage) {
            mpInstance.indexPage = info.path;
            mpInstance.networkInfo;
            mpInstance.userInfo;
          }
          let date = Date.now() || new Date().getTime();
          console.log(`App：${name}_${date}`)
          self.__TIMELINE__[`App_${name}`] = date;
          if (name === 'onLaunch') {
            self._appLanch = {
              layoutTime: date,
              extra: { name: '首屏时间', scene: info.scene }
            }
            mpInstance.sceneInfo = info;
            mpInstance.getVersionInfo().then((res) => {
              mpInstance.sceneInfo = Object.assign(mpInstance.sceneInfo, { mpVersion: res });
            })
          }
          if (name === 'onShow') {
            self.__TIMELINE__['Page_init'] = date;
          }
          return primaryHookFn && primaryHookFn.call(this, info);
        }
      })
      primaryApp && primaryApp.call(this, obj);
    }
  }

  private interceptPage = (): void => {
    let self = this;
    let isTaro = (typeof (process) !== 'undefined' && typeof (process.env) !== 'undefined' && typeof (process.env.TARO_ENV) !== 'undefined') ? true : false;
    const primaryPage = Page;

    const client: any = getCurrentHub().getClient();
    const options = client?.getOptions();

    if (isTaro) {
      let primaryComponent = Component;
      Component = (obj: any) => {
        PAGE_LIFE_CYCLE.forEach(name => {
          if (typeof obj.methods[name] === 'function') {
            const primaryHookFn = obj.methods[name];
            obj.methods[name] = function (info: any) {
              return self.rewritePageLifeCycle(name, this, primaryHookFn, info);
            }
          }
        });
        primaryComponent && primaryComponent.call(this, obj);
      }
    }
    Page = (obj: any) => {
      PAGE_LIFE_CYCLE.forEach(name => {
        const primaryHookFn = obj[name];
        obj[name] = function (info: any) {
          return self.rewritePageLifeCycle(name, this, primaryHookFn, info);
        }
      });
      // 上报函数执行轨迹
      if (options && options.reportBreadcrumb) {
        self.rewriteFunctionReportBreadcrumb(obj);
      }
      primaryPage && primaryPage.call(this, obj);
    }
  }

  private rewritePageLifeCycle(name: string, self: this, primaryHookFn: any, info: any) {
    let date = Date.now() || new Date().getTime();
    let mpInstance = MP.instance();
    console.log(`Page：${name}_${date}`);
    this.__TIMELINE__[`Page_${name}`] = date;

    if (name === 'onHide') {
      this.__TIMELINE__['Page_init'] = date;
    }

    if (name === 'onLoad') {
      mpInstance.pageParams = {
        url: mpInstance.currentPage,
        query: info
      }
    }

    //页面渲染完成上报性能数据
    if (name === 'onReady') {
      const transaction = Transaction.instance();

      if (!this._fpDown) {
        this.__TIMELINE__['ready'] = date;
        this._fpDown = true;
      }
      addNavigationSpans(transaction, this.__TIMELINE__);
      addAppContexts(transaction, { ...this.__TIMELINE__, AppLaunch: this._appLanch });

      transaction.finish();
    }

    return primaryHookFn && primaryHookFn.call(self, info);
  }

  // 页面记录函数调用轨迹
  private rewriteFunctionReportBreadcrumb = (options: any) => {
    let mpInstance = MP.instance();

    for (let opt in options) {
      if (typeof (options[opt] === "function") && opt !== 'data') {
        let primaryHookFn = options[opt];
        options[opt] = function () { 
            let startTimestamp = Date.now();
            const event: any = {
              type: 'function',
              logType: 'breadcrumb',
              functions: [{
                functionName: opt,
                functionType: arguments[0] ? arguments[0].type : opt,
                params: encodeURIComponent(JSON.stringify(arguments)),
                url: mpInstance.currentPage,
                startTimestamp,
                endTimestamp: Date.now(),
              }]
            };
            getCurrentHub().captureEvent(event);
          return primaryHookFn && primaryHookFn.apply(this, arguments);
        }
      }
    }
    return options;
  }

  static instance(): MPVitals {
    if (vitals) return vitals;

    vitals = new MPVitals();

    return vitals;
  }
}
