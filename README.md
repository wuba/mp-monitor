# mp-monitor

> MP monitor is a tool that supports the collection of applet error, exception, performance and behavior trace. Support multi terminal apple


## 简介
> `mp-monitor`脱胎于58内部前端质量监控系统`beidou`。致力于为小程序异常采集和性能统计分析提供采集方案和统一的数据指标，适配多端小程序（微信，头条，支付宝，百度，QQ，360，JD）。
如果开发者想要在自己的项目中快速搭建小程序的异常采集和性能监控数据分析。`mp-monitor`将能帮助你快速采集到相关的数据用于分析和监控。

## 使用

### 安装引入
> 项目提供npm包和资源引入两种方式引用，在小程序开发框架中建议使用包管理器进行安装。如果开发者使用的是原生的小程序框架可以下载后将.min.js文件拷贝到项目中使用。

-  npm or yarn

```js
npm i mp-monitor --save
```

- 下载资源引入

> 原生小程序开发，建议将mp_monitor打包后dist目录下 `mp-monitor.min.js`拷贝到项目目录下直接使用。

```js
const mpMonitor = require('./vendor/mp-monitor.min.js');
```

### 使用
> 在小程序入口文件app注册初始化mpMonitor

```js
import * as mpMonitor from 'mp-monitor'
mpMonitor.init({
  projectId: '', // 项目标识
  url: '' // 数据上报地址
});
```

### 小程序后台配置

> 将接口上报域名 `url`  配置到小程序管理后台开发设置的request合法域名中。

## 特性

- 🚀 采集request处理异常
- 🚀 采集console全局异常
- 🚀 采集资源文件下载异常
- 🚀 采集小程序页面维度性能数据
- 🚀 记录客户端基本信息（系统信息、用户信息、网络信息、场景信息）
- 🚀 支持微信、百度、头条、支付宝、QQ、360等多端异常采集
- 采集用户行为轨迹【进行中】

## 上报数据指标

### 公共信息
```js
"request": {
    "url": "buydetail/pages/buydetail/detail",
    "headers": {
        "appName": "wx",
        "appVersion": "8.0.5",
        "appSDKVersion": "2.19.0",
        "imei": "0a27f2e6b2934c1f97ddac8f253ac7c3",
        "uuid": "0a27f2e6b2934c1f97ddac8f253ac7c3",
        "pid": "0a27f2e6b2934c1f97ddac8f253ac7c3",
        "os": "iOS",
        "osv": "10.0.1",
        "device": "iPhone 5",
        "brand": "devtools",
        "benchmarkLevel": 1,
        "networkType": "wifi",
        "systemInfo": {
            "model": "iPhone 5",
            "pixelRatio": 2,
            "windowWidth": 320,
            "windowHeight": 456,
            "system": "iOS 10.0.1",
            "language": "zh_CN",
            "version": "8.0.5",
            "screenWidth": 320,
            "screenHeight": 568,
            "SDKVersion": "2.19.0",
            "brand": "devtools",
            "fontSizeSetting": 16,
            "benchmarkLevel": 1,
            "batteryLevel": 100,
            "statusBarHeight": 20,
            "safeArea": {
                "top": 20,
                "left": 0,
                "right": 320,
                "bottom": 568,
                "width": 320,
                "height": 548
            },
            "deviceOrientation": "portrait",
            "platform": "devtools",
            "enableDebug": false,
            "devicePixelRatio": 2
        },
        "network": {
            "networkType": "wifi"
        },
        "scene": 1001,
        "sceneInfo": {
            "path": "pages/index/index",
            "query": {},
            "scene": 1001,
            "referrerInfo": {}
        }
    }
}
```

### js错误异常
```js
{
    "exceptions": [{
        "errType": "MiniProgramError",
        "content": "app.checkAuthorize1 is not a function",
        "message": "TypeError: app.checkAuthorize1 is not a function",
        "stacktrace": "..."
    }],
    "request": {},
    "type": "exception",
    "projectId": 1,
    "sdk": {
        "name": "mp_monitor",
        "version": "0.0.1"
    }
}
```
### 接口异常
```js
{
    "apis": [{
        "eventId": "53717409a49644aeaafd96f7e463edb4",
        "category": "xhr",
        "url": "/test/hshsh",
        "statusCode": -1,
        "errMsg": "request:fail invalid url \"/test/hshsh\"",
        "timestamp": 1625456003852
    }],
    "request": {},
    "type": "api",
    "projectId": 1,
    "sdk": {
        "name": "mp_monitor",
        "version": "0.0.1"
    }
}
```

### 资源异常
```js
{
    "resources": [{
        "eventId": "8e30fb281724400f9dcc7fd32d9ec7a8",
        "url": "https://a.cdn.com.cn/app/js/a.js",
        "category": "downloadFile",
        "errMsg": "downloadFile:ok",
        "statusCode": 404,
        "timestamp": 1625484994005
    }],
    "request": {},
    "type": "resource",
    "projectId": 1,
    "sdk": {
        "name": "mp_monitor",
        "version": "0.0.1"
    },
}
```

### 性能数据
```js
{
    "performances": [{
        "eventId": "524f4b6af6d9411f898bef6be8fbf7c2",
        "contexts": [{
            "description": "READY0", //首屏时间
            "time": 1446,
            "extra": ""
        }],
        "spans": [{
            "description": "SPAN0", //小程序初始化耗时
            "endTimestamp": 1628761356913,
            "startTimestamp": 1628761356908
        }, {
            "description": "SPAN1", //小程序启动耗时
            "endTimestamp": 1628761356964,
            "startTimestamp": 1628761356913
        }, {
            "description": "SPAN2", //页面加载耗时
            "endTimestamp": 1628761397058,
            "startTimestamp": 1628761397011
        }, {
            "description": "SPAN3", //页面显示耗时
            "endTimestamp": 1628761397233,
            "startTimestamp": 1628761397058
        }, {
            "description": "SPAN4", //页面渲染耗时
            "endTimestamp": 1628761397521,
            "startTimestamp": 1628761397233
        }],
        "timestamp": 1628761397523
    }],
    "type": "performance",
    "projectId": 1,
    "sdk": {
        "name": "mp_monitor",
        "version": "0.0.1"
    },
    "request": {}
}
```

## 开发

```shell
npm start // ts编译 然后在调试小程序中将SDK资源引入地址修改为编译后入口

npm run build  // 编译构建包和资源

```

## 贡献
> 项目采用MIT开源协议，pull request之前请提交Issue讨论。

- 提交Issue
- 方案讨论
- 提交PR
