import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import GlobalUser from "@utils/globalUser";
import { mosaicText } from "@utils/common";
import { AtIcon } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userMeta: []
    };
  }

  config = {
    navigationBarTitleText: "我的资料"
  };

  componentWillMount() {
    let userInfo = GlobalUser.getUserInfo();
    let userMeta = [];
    userMeta.push({
      title: "昵称",
      value: userInfo.nickName
    });
    userMeta.push({
      title: "用户名",
      value: userInfo.userName
    });
    userMeta.push({
      title: "手机号码",
      value: mosaicText(userInfo.phone, 4, 7) || "-"
    });
    userMeta.push({
      title: "真实姓名",
      value: userInfo.realName || "-"
    });
    userMeta.push({
      title: "身份证号码",
      value: userInfo.idCard || "-"
    });
    this.setState({ userInfo, userMeta });
  }

  copy2Clipboard(key) {
    let userId = this.state.userInfo.userId;
    let cpData = null;
    if (key == "userId") {
      cpData = `用户ID：${userId}`;
    }
    Taro.setClipboardData({
      data: cpData,
      success: function() {
        Taro.getClipboardData({
          success: function(res) {
            console.log(res.data); // data
          }
        });
      }
    });
  }

  render() {
    let { userInfo, userMeta } = this.state;
    return (
      <View className="vm-page user-info">
        <View className="user-info__pannel">
          <View className="user-avatar">
            <Image src={userInfo.avatarUrl} mode="aspectFit"></Image>
          </View>
          <View
            className="user-id"
            onClick={this.copy2Clipboard.bind(this, "userId")}
          >
            <AtIcon
              prefixClass="fa"
              value="copy"
              size="12"
              color="#ccc"
              className="cp-icon"
            ></AtIcon>
            <Text>ID:{userInfo.userId}</Text>
          </View>
          <View className="user-meta">
            {userMeta.map(m => (
              <View className="user-meta-item" key={m.title}>
                <View className="key">{m.title}</View>
                <View className="val">{m.value}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
