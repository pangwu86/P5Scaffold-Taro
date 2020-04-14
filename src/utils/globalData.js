import Taro from "@tarojs/taro";

export function gset(key, val) {
  return Taro.setStorage(key, val);
}
export function gget(key) {
  return Taro.getStorage(key);
}

export function gsetSync(key, val) {
  return Taro.setStorageSync(key, val);
}
export function ggetSync(key) {
  return Taro.getStorageSync(key);
}

export function gremove(key) {
  return Taro.removeStorage(key);
}
export function gremoveSync(key) {
  return Taro.removeStorageSync(key);
}

export function gclear() {
  return Taro.clearStorage();
}
export function gclearSync() {
  return Taro.clearStorageSync();
}

export default {
  gget,
  ggetSync,
  gset,
  gsetSync,
  gremove,
  gremoveSync,
  gclear,
  gclearSync,
};
