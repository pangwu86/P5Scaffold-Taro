import { ggetSync } from "@utils/globalData";
import Http from "./http";

const setParams = (data) => {
  data.timestamp = new Date().getTime();
  data.version = "1.0.0";
  data.token = ggetSync("token") || undefined;
  data.userId = ggetSync("user_id") || undefined;
};

const log = (nm, res) => {
  console.log("### " + nm + " ###\n" + JSON.stringify(res, null, 2));
};

const postData = (url, data) => {
  data = data || {};
  setParams(data);
  return Http.post(url, data);
};

const api = {
  log,
  wxappLogin(data) {
    return postData("/user/wxmaLogin.htm", data);
  },
  wxappBind(data) {
    return postData("/user/wxmaBind.htm", data);
  },
};

export default api;
