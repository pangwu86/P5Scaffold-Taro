import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { AtButton, AtMessage } from "taro-ui";
import API from "@/services/api";
import { gget, gset } from "@/utils/globalData";
import { isLogin, weappLogin, wxSystemInfo } from "@/utils/globalUser.js";
import "./index.scss";
import { formatTime } from "@/utils/common.js";

export default class Index extends Component {
  constructor() {
    this.state = {
      userInfo: null,
      sessionInfo: null,
      loginInfo: null,
      userId: null,
      token: null,
      tokenFailtime: null,
      productInfo: null,
      buyerInfo: {
        roleName: "胖五",
        roleLevel: "33",
        camp: "部落",
        buyerPhone: "18506419566",
        buyerQq: "520180471"
      }
    };
  }

  config = {
    navigationBarTitleText: "接口测试"
  };

  onGotUserInfo(e) {
    let self = this;
    if (e.detail.userInfo) {
      let uinfo = e.detail.userInfo;
      console.log("user-info:\n" + JSON.stringify(uinfo, null, 2));
      this.setState({
        userInfo: uinfo
      });
      weappLogin(function(code) {
        self.doUserLogin(code);
      });
    } else {
      Taro.atMessage({
        message: "授权失败，请重新点击屏幕中间按钮",
        type: "warning"
      });
    }
  }

  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
      let data = {
        session: this.state.sessionInfo,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      };
      API.wxappBind(data).then(res => this.setLoginInfo(res.data));
    } else {
      Taro.atMessage({
        message: "授权失败，请重新点击屏幕中间按钮",
        type: "warning"
      });
    }
  }

  doUserLogin(code) {
    let data = {
      code,
      userInfo: this.state.userInfo,
      device: wxSystemInfo()
    };
    let self = this;
    API.wxappLogin(data).then(res => {
      if (res.status == "USER_NEED_WXMABIND") {
        self.setState({
          sessionInfo: res.data
        });
      } else {
        self.setLoginInfo(res.data);
      }
    });
  }

  setLoginInfo(data) {
    gset("loginInfo", data);
    gset("token", data.token);
    gset("tokenFailtime", data.failureTime);
    gset("userId", data.userId);
    this.setState({
      userId: data.userId,
      token: data.token,
      tokenFailtime: data.failureTime,
      loginInfo: data
    });
  }

  checkLoginInfo() {
    if (gget("token")) {
      if (gget("tokenFailtime") * 1000 > new Date().getTime()) {
        this.setState({
          userId: gget("userId"),
          token: gget("token"),
          tokenFailtime: gget("tokenFailtime"),
          loginInfo: gget("loginInfo")
        });
      }
    }
  }

  getTokenFail() {
    if (this.state.tokenFailtime) {
      let ft = new Date();
      ft.setTime(this.state.tokenFailtime * 1000);
      return formatTime(ft);
    }
    return "";
  }

  componentDidMount() {
    this.checkLoginInfo();
  }

  // 验证手机
  sendPhoneCode() {
    API.sendCode({
      userId: this.state.userId,
      targetType: "PHONE",
      action: "BIND"
    }).then(res => {
      API.log("send-code", res);
    });
  }

  channelList(gameId) {
    API.gameChannelList({ gameId }).then(res => {
      API.log("channel-list", res);
    });
  }

  serverList(channelId) {
    API.gameServerList({ channelId }).then(res => {
      API.log("server-list", res);
    });
  }

  productInfo(gameId, channelId, serverId, productType) {
    API.productInfo({
      gameId,
      channelId,
      serverId,
      productType
    }).then(res => {
      API.log("product-info", res);
      if (res.status == "SUCCESS") {
        this.setState({
          productInfo: res.data
        });
      }
    });
  }

  consigneeList(gameId, channelId, serverId) {
    API.consigneeList({
      gameId,
      channelId,
      serverId
    }).then(res => {
      API.log("consignee-list", res);
    });
  }

  consigneeAdd(gameId, channelId, serverId) {
    API.consigneeAdd({
      gameId,
      channelId,
      serverId,
      roleName: this.state.buyerInfo.roleName,
      roleLevel: this.state.buyerInfo.roleLevel,
      camp: this.state.buyerInfo.camp,
      buyerPhone: this.state.buyerInfo.buyerPhone,
      buyerQq: this.state.buyerInfo.buyerQq
    }).then(res => {
      API.log("consignee-list", res);
    });
  }

  orderList(orderStatus) {
    API.orderList({
      orderStatus,
      pageSize: 10,
      pageNumber: 1
    }).then(res => {
      API.log("order-list", res);
    });
  }

  orderCreate() {
    let data = {};
    data.productId = this.state.productInfo.productId;
    data.productVersion = this.state.productInfo.productVersion;
    data.roleName = this.state.buyerInfo.roleName;
    data.roleLevel = this.state.buyerInfo.roleLevel;
    data.camp = this.state.buyerInfo.camp;
    data.buyerPhone = this.state.buyerInfo.buyerPhone;
    data.buyerQq = this.state.buyerInfo.buyerQq;
    data.cr = "等着砸装备，快点呀";
    data.quantity = 200;
    API.orderCreate(data).then(res => {
      API.log("order-create", res);
    });
  }

  orderCancel(orderId) {
    let data = {
      orderId
    };
    API.orderCancel(data).then(res => {
      API.log("order-cancel", res);
    });
  }

  orderPay(orderId) {
    let data = {
      orderId,
      paymentMethod: "PAYMENT_METHOD_WECHATPAY_MA"
    };
    API.orderPay(data).then(res => {
      API.log("order-pay", res);
      Taro.requestPayment(res.data)
        .then(payRes => {
          console.log("pay-ok:" + JSON.stringify(payRes, null, 2));
        })
        .catch(payErr => {
          console.log("pay-fail:" + JSON.stringify(payErr, null, 2));
        });
    });
  }

  render() {
    let { sessionInfo, loginInfo } = this.state;
    return (
      <View className="vm-page">
        <AtMessage />
        {/* 用户登陆 */}
        <View className="api">
          <View className="title">
            用户登陆({loginInfo ? "已登陆" : "未登陆"})
          </View>
          <View className="at-row at-row--wrap">
            {/* 已登陆 */}
            {loginInfo && (
              <View className="at-col">
                <View>UserId: {loginInfo.userId}</View>
                <View>Token: {loginInfo.token}</View>
                <View>Failtime: {this.getTokenFail()}</View>
              </View>
            )}
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                openType="getUserInfo"
                lang="zh_CN"
                onGetUserInfo={this.onGotUserInfo.bind(this)}
              >
                授权登陆
              </AtButton>
            </View>
            {sessionInfo && (
              <View className="at-col at-col-12">
                <AtButton
                  type="primary"
                  size="normal"
                  openType="getPhoneNumber"
                  lang="zh_CN"
                  onGetPhoneNumber={this.getPhoneNumber.bind(this)}
                >
                  获取手机号
                </AtButton>
              </View>
            )}
          </View>
        </View>

        {/* 手机号验证 */}
        <View className="api">
          <View className="title">绑定手机号</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.sendPhoneCode.bind(this)}
              >
                发送验证码
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.12 获取游戏渠道(区)</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.channelList.bind(this, 1000)}
              >
                获取Game：1000
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.13 获取游戏区服</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.serverList.bind(this, 34)}
              >
                获取channelId：34
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.14 获取商品信息</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.productInfo.bind(this, 1000, 34, 1, 1000)}
              >
                获取商品信息
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.15 添加收货角色信息</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.consigneeAdd.bind(this, 1000, 34, 1)}
              >
                添加我的收货信息
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.15 获取收货角色信息列表</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.consigneeList.bind(this, 1000, 34, 1)}
              >
                收货角色信息列表
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.18 订单列表</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.orderList.bind(this, undefined)}
              >
                已创建
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.16 创建订单</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.orderCreate.bind(this)}
              >
                创建新订单
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.17 支付订单</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.orderPay.bind(this, "1245999535264649217")}
              >
                支付订单
              </AtButton>
            </View>
          </View>
        </View>

        <View className="api">
          <View className="title">4.21 取消未支付订单</View>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <AtButton
                type="primary"
                size="normal"
                onClick={this.orderCancel.bind(this, "1245999535264649217")}
              >
                取消订单
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
