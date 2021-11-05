/**
 * @file 常量定义
 * * */

// 定义span的最大个数
export const DEFAULT_MAX_SPAN: number = 100; // 定义性能span的最大个数
export const DEFAULT_NAVIGATION_NAME: string = '__beidou_pageload' // 定义性能统计tracing名

export const timelineStructure: Record<string, string>[] = [
  {
    description: 'SPAN0', //小程序初始化耗时
    startTimestamp: 'in',
    endTimestamp: 'App_onLaunch',
  },
  {
    description: 'SPAN1', //小程序启动耗时
    startTimestamp: 'App_onLaunch',
    endTimestamp: 'App_onShow',
  },
  {
    description: 'SPAN2', //页面加载耗时
    startTimestamp: 'Page_init', //Page_init = App_onShow | Page_onHide
    endTimestamp: 'Page_onLoad',
  },
  {
    description: 'SPAN3', //页面显示耗时
    startTimestamp: 'Page_onLoad',
    endTimestamp: 'Page_onShow',
  },
  {
    description: 'SPAN4', //页面渲染耗时
    startTimestamp: 'Page_onShow',
    endTimestamp: 'Page_onReady',
  }
];