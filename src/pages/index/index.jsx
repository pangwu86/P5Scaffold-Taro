import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import API from "@services/api";
import "./index.scss";

export default class Index extends Component {
  constructor() {
    this.state = {};
  }

  config = {
    navigationBarTitleText: "接口测试"
  };

  componentDidMount() {}

  render() {
    return (
      <View className="vm-page">
        <AtMessage />
      </View>
    );
  }
}
