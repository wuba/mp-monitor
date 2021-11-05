import { getGlobalObject } from './misc';

const global = getGlobalObject();

// 设置localStorage
export function setStorage(key: string, value: string | number | object, expire?: number) {
  const curTime = new global.Date().getTime();
  const val = JSON.stringify({ data: value, time: curTime, expire });
  global.localStorage.setItem(key, val);
}

// 获取localStorage
export function getStorage(key: string) {
  const value = global.localStorage.getItem(key);
  if (!value) {
    return false;
  }
  const { data, time = 0, expire = 0 } = JSON.parse(value);
  if (expire === 0) {
    return data;
  }
  if (expire > 0 && new global.Date().getTime() - time > expire) {
    global.localStorage.removeItem(key);
    return false;
  }
  return data;
}
