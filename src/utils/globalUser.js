import Taro from "@tarojs/taro";
import { ggetSync, gsetSync } from "./globalData";

export function isLogin() {
  if (getUserInfo() !== "" && !isExpire()) {
    return true;
  }
  return false;
}

export function isExpire() {
  let token_expire = ggetSync("token_expire");
  if (ggetSync("token") !== "" && token_expire !== "") {
    // token是否过期
    return token_expire <= new Date().getTime();
  }
  // 过期
  return true;
}

// 获取常用信息
export function getToken() {
  return ggetSync("token");
}
export function getUserInfo() {
  return ggetSync("user_info");
}
export function getUserId() {
  return ggetSync("user_id");
}

export function getWxUser() {
  return ggetSync("wx_user");
}
export function getWxSys() {
  return ggetSync("wx_sys") || Taro.getSystemInfoSync();
}

// 设置常用信息
export function setWxUser(wxUserInfo) {
  gsetSync("wx_user", wxUserInfo);
}

export function setLoginInfo(userInfo, userId, token, tokenExpire) {
  gsetSync("user_info", userInfo);
  gsetSync("user_id", userId);
  gsetSync("token", token);
  gsetSync("token_expire", tokenExpire);
}

export function wxLogin(callback) {
  return Taro.login({
    success(res) {
      if (res.code) {
        callback && callback(res.code);
      }
    },
  });
}

export default {
  isLogin,
  isExpire,
  getUserId,
  getUserInfo,
  getToken,
  setLoginInfo,
  getWxSys,
  getWxUser,
  setWxUser,
  wxLogin,
};
