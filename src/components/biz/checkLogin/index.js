import imgAuthUser from "@images/auth_user.png";
import imgAuthPhone from "@images/auth_phone.png";
import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { AtMessage } from "taro-ui";
import { View } from "@tarojs/components";
import { VmLogin } from "@/components/common/index";
import GlobalUser from "@utils/globalUser";
import GlobalData from "@utils/globalData";
import API from "@services/api";

export default class CheckLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };
  }

  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      this.setState({
        showLoading: true,
      });
      let uinfo = e.detail.userInfo;
      let self = this;
      console.log("wx-userinfo:\n" + JSON.stringify(uinfo, null, 2));
      GlobalUser.wxLogin().then((res) => {
        let code = res.code;
        console.log("wx-code:\n" + code);
        self.doUserLogin(code, uinfo);
      });
    } else {
      Taro.atMessage({
        message: "授权失败，请重新点击屏幕中间按钮",
        type: "warning",
      });
    }
  }

  onGetPhoneNumber(e) {
    if (e.detail.encryptedData) {
      this.setState({
        showLoading: true,
      });
      let self = this;
      let data = {
        session: GlobalData.ggetSync("session_info"),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      };
      API.wxappBind(data).then((res) => {
        self.props.onChangePhone(false);
        self.setLoginInfo(res.data);
      });
    } else {
      Taro.atMessage({
        message: "授权失败，请重新点击屏幕中间按钮",
        type: "warning",
      });
    }
  }

  doUserLogin(code, userInfo) {
    let data = {
      code,
      userInfo,
      device: GlobalUser.getWxSys(),
    };
    let self = this;
    API.wxappLogin(data).then((res) => {
      self.setState({
        showLoading: false,
      });
      if (res.ok) {
        self.props.onChangeUser(false);
        self.setLoginInfo(res.data);
      }
    });
  }

  setLoginInfo(loginInfo) {
    this.setState({
      showLoading: false,
    });
    GlobalUser.setLoginInfo(
      loginInfo,
      loginInfo.userId,
      loginInfo.token,
      loginInfo.tokenExpire
    );
    this.props.onChangeLogin(true);
  }

  beforeShowCheck() {
    if (GlobalUser.isLogin()) {
      this.props.onChangeLogin(true);
    } else {
      this.props.onChangeLogin(false);
    }
  }

  componentDidShow() {
    this.beforeShowCheck();
  }

  componentDidHide() {
    this.props.onChangeUser(false);
    this.props.onChangePhone(false);
  }

  render() {
    let { showUser, showPhone } = this.props;
    let { showLoading } = this.state;
    return (
      <View className="vm-component">
        <AtMessage></AtMessage>
        {/* 授权登陆 */}
        {showUser && (
          <VmLogin
            pic={imgAuthUser}
            showLoading={showLoading}
            onClick={this.onGotUserInfo.bind(this)}
          ></VmLogin>
        )}
        {/* 授权手机号 */}
        {showPhone && (
          <VmLogin
            title="绑定手机"
            pic={imgAuthPhone}
            showLoading={showLoading}
            content="仅需一次，即可享受高质量售后服务"
            btn="授权手机号码"
            openType="getPhoneNumber"
            onClick={this.onGetPhoneNumber.bind(this)}
          ></VmLogin>
        )}
      </View>
    );
  }
}

CheckLogin.defaultProps = {
  showUser: false,
  showPhone: false,
  onChangeLogin: (val) => {
    console.log(val);
  },
  onChangeUser: (val) => {
    console.log(val);
  },
  onChangePhone: (val) => {
    console.log(val);
  },
};

CheckLogin.propTypes = {
  showUser: PropTypes.bool,
  showPhone: PropTypes.bool,
  onChangeUser: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeLogin: PropTypes.func,
};
