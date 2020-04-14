import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import { CheckLogin, UserBanner, UserBalance, UserMenu } from "@components/biz";
import GlobalUser from "@utils/globalUser";
import menuOrder from "@images/menu_order.png";
import menuContact from "@images/menu_contact.png";
import menuGamers from "@images/menu_gamers.png";
import "./index.scss";

export default class Index extends Component {
  constructor() {
    this.state = {
      userInfo: {},
      loginOk: false,
      authUser: false,
      authPhone: false,
      menu: [
        {},
        {
          title: "订单管理",
          arrow: "right",
          thumb: menuOrder,
          url: "/pages/orderList/index"
        },
        {},
        // {
        //   title: "帮助反馈",
        //   arrow: "right",
        //   thumb: menuHelp,
        //   border: true
        // },
        {
          title: "联系客服",
          arrow: "right",
          thumb: menuContact,
          type: "button",
          openType: "contact"
        },
        {},
        {
          title: "游戏角色",
          arrow: "right",
          thumb: menuGamers,
          url: "/pages/myConsignee/index"
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

  onShareAppMessage() {
    return {
      title: "一个买DNF金币的好地方",
      path: "/pages/launch/index?userId=" + GlobalUser.getUserId()
    };
  }

  render() {
    let { authUser, authPhone, menu, userInfo } = this.state;
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
          name={userInfo.nickname ? userInfo.nickname : "未登陆用户"}
          remark={userInfo.userId ? "ID：" + userInfo.userId : "请点击授权登陆"}
          onAvatarClick={this.onUserClick.bind(this)}
          onInfoClick={this.onUserClick.bind(this)}
          onEditClick={this.onUserClick.bind(this)}
        ></UserBanner>
        <UserBalance></UserBalance>
        {/* 用户菜单 */}
        <UserMenu menu={menu} onClick={this.onMenuClick.bind(this)}></UserMenu>
      </View>
    );
  }
}
