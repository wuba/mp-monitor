# 小程序监控sdk

小程序监控sdk（异常日志、性能日志、行为轨迹日志）

## 使用

1. npm形式使用

```js
npm i mp_monitor --save

const mpMonitor = require('mp_monitor');
mpMonitor.init({
  projectId: '',
  url: ''
});
```

2. 单文件形式使用

> 原生小程序开发，建议将 mp_monitor 包dist目录下 mp_monitor.min.js 拷贝到项目目录下直接使用

```js
const mpMonitor = require('./utils/mp-monitor');
mpMonitor.init({
  projectId: '',
  url: ''
});
```
### 后台配置

使用需要在后台将接口上报域名 **url**  配置到 request合法域名 中

## 参数描述

- projectId: 项目标识
- url: 异常日志上报接口地址

### 特性

- 采集request处理异常
- 采集console全局异常
- 采集资源文件下载异常
- 采集小程序页面维度性能数据
- 记录客户端基本信息（系统信息、用户信息、网络信息、场景信息）
- 支持微信、百度、头条、支付宝、QQ、360等多端异常采集
- 采集用户行为轨迹【进行中】
