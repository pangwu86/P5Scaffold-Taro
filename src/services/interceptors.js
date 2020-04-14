import Taro from "@tarojs/taro";
import GlobalDate from "@utils/globalData";
import GlobalUser from "@utils/globalUser";
import HTTP_STATUS from "./status";

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then((res) => {
    Taro.hideNavigationBarLoading({});
    // TODO 根据自身业务修改, 是否需要判断登陆状态，token问题
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

const interceptors = [customInterceptor];
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];
export default interceptors;
