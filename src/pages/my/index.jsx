import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import { CheckLogin, UserBanner, UserBalance, UserMenu } from "@components/biz";
import GlobalUser from "@utils/globalUser";
import "./index.scss";

export default class Index extends Component {
  constructor() {
    this.state = {
      userInfo: {},
      loginOk: false,
      authUser: false,
      authPhone: false,
      menuList: [
        {},
        {
          title: "消息设置",
          arrow: "right"
        },
        {
          title: "帮助中心",
          arrow: "right"
        },
        {},
        {
          title: "联系德纳",
          arrow: "right",
          type: "button",
          openType: "contact"
        }
      ],
      balanceList: [
        {
          name: "余额(元)",
          value: "0.00"
        },
        {
          name: "待续费(元)",
          value: "0.00"
        },
        {
          name: "代金券(元)",
          value: "0.00"
        }
      ]
    };
  }

  config = {
    navigationBarTitleText: "我的"
  };
  // 检查用户登陆
  authChangeUser(val) {
    this.setState({
      authUser: val
    });
  }
  authChangePhone(val) {
    this.setState({
      authPhone: val
    });
  }
  authChangeLogin(val) {
    this.setState({
      loginOk: val
    });
    if (true) {
      this.setState({
        userInfo: GlobalUser.getUserInfo()
      });
    }
  }
  authCheckLogin() {
    if (this.state.loginOk) {
      return true;
    }
    this.setState({
      authUser: true
    });
    return false;
  }

  onMenuClick(m) {
    if (this.authCheckLogin()) {
      if (m.url) {
        Taro.navigateTo({ url: m.url });
      }
    }
  }

  onUserClick() {
    if (this.authCheckLogin()) {
      Taro.navigateTo({ url: "/pages/myInfo/index" });
    }
  }

  componentWillMount() {
    let userInfo = GlobalUser.getUserInfo() || {};
    this.setState({
      userInfo
    });
  }

  render() {
    let { authUser, authPhone, userInfo, menuList, balanceList } = this.state;
    return (
      <View className="vm-page bg-whitesmoke">
        <AtMessage></AtMessage>
        {/* 检查登陆 */}
        <CheckLogin
          showUser={authUser}
          showPhone={authPhone}
          onChangePhone={this.authChangePhone.bind(this)}
          onChangeUser={this.authChangeUser.bind(this)}
          onChangeLogin={this.authChangeLogin.bind(this)}
        ></CheckLogin>
        {/* 用户信息 */}
        <UserBanner
          avatar={userInfo.avatarUrl}
          name={userInfo.nickName ? userInfo.nickName : "未登陆用户"}
          remark={userInfo.userId ? "ID：" + userInfo.userId : "请点击授权登陆"}
          onAvatarClick={this.onUserClick.bind(this)}
          onInfoClick={this.onUserClick.bind(this)}
          onEditClick={this.onUserClick.bind(this)}
        ></UserBanner>
        {/* 余额信息 */}
        <UserBalance balanceList={balanceList}></UserBalance>
        {/* 用户菜单 */}
        <UserMenu
          menuList={menuList}
          onClick={this.onMenuClick.bind(this)}
        ></UserMenu>
      </View>
    );
  }
}
