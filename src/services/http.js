import Taro from "@tarojs/taro";
import getBaseUrl from "./config";
import interceptors from "./interceptors";

interceptors.forEach((i) => Taro.addInterceptor(i));

class httpRequest {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = params.contentType || "application/json;charset=UTF-8";
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
      },
    };
    // token等校验
    // if (Taro.getStorageSync("Authorization")) {
    //   option.header.Authorization = Taro.getStorageSync("Authorization");
    // }
    Taro.showNavigationBarLoading({});
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  postForm(url, data) {
    let params = { url, data, "application/x-www-form-urlencoded;charset=UTF-8" };
    return this.baseOptions(params, "POST");
  }

  uploadFile(url, data) {
    let params = { url, data, "multipart/form-data" };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}

export default new httpRequest();
