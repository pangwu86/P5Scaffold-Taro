// import JSONBig from "json-bigint";
import { timeout } from "@utils/common.js";
import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import "./app.scss";

Taro.$timeout = timeout;

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== "production" && process.env.TARO_ENV === "h5") {
  require("nerv-devtools");
}

class App extends Component {
  componentDidMount() {
    console.log("ENV:" + process.env.NODE_ENV);
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: ["pages/index/index", "pages/my/index"],
    tabBar: {
      color: "#aaaaaa",
      selectedColor: "#ff9d1c",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "主页",
          iconPath: "assets/images/tab/shop.png",
          selectedIconPath: "assets/images/tabSel/shop.png",
        },
        {
          pagePath: "pages/my/index",
          text: "我的",
          iconPath: "assets/images/tab/personal.png",
          selectedIconPath: "assets/images/tabSel/personal.png",
        },
      ],
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "Taro模板项目",
      navigationBarTextStyle: "black",
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
