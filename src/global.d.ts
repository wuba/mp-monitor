declare interface IContext {
  getSystemInfoSync: () => TSystemInfo,
  getUserInfo: (object: Object) => {}
  getNetworkType: (object: Object) => {},
  request: (object: Object) => {}
}

declare var wx: IContext; //微信小程序
declare var swan: IContext; //百度小程序
declare var tt: IContext; // 头条小程序
declare var my: IContext; // 支付宝小程序
declare var qq: IContext; // QQ小程序
declare var qh: IContext; // 360小程序

declare var getCurrentPages: (message?: any) => Array<any>;