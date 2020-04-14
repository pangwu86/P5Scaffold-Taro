import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./index.scss";

export default class UserBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let {
      avatar,
      name,
      remark,
      onEditClick,
      onAvatarClick,
      onInfoClick,
    } = this.props;
    // let {  } = this.state;
    return (
      <View className="vm-component">
        <View className="at-row vm-user-banner">
          <View
            className="at-col at-col-3 vm-user-banner__avatar"
            onClick={onAvatarClick.bind(this)}
          >
            <Image src={avatar} mode="aspectFit"></Image>
          </View>
          <View
            className="at-col at-col-7 vm-user-banner__info"
            onClick={onInfoClick.bind(this)}
          >
            <View className="name">{name}</View>
            {remark && <View className="remark">{remark}</View>}
          </View>
          <View
            className="at-col at-col-2 vm-user-banner__edit"
            onClick={onEditClick.bind(this)}
          >
            <AtIcon value="chevron-right" size="24" color="#ccc"></AtIcon>
          </View>
        </View>
      </View>
    );
  }
}

UserBanner.propTypes = {
  name: PropTypes.string,
  remark: PropTypes.string,
  avatar: PropTypes.string,
  onEditClick: PropTypes.func,
  onAvatarClick: PropTypes.func,
  onInfoClick: PropTypes.func,
};

UserBanner.defaultProps = {
  name: "未登录用户",
  remark: "请点击授权登陆",
  onEditClick: () => {},
  onAvatarClick: () => {},
  onInfoClick: () => {},
  avatar:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAAEgAAABIAEbJaz4AAABIUExURUdwTImJiYqKioqKioqKioqKioqKioqKioyMjIqKioqKiomJiYqKioqKioqKioqKioqKioqKiouLi4uLi4qKioqKioqKioqKiog0COcAAAAXdFJOUwA/KaVe78z4BeR3FoWQmh9q2A4zTLyx/T1YDQAABOVJREFUeNrFm9uWpCAMRUG5ewNF8/9/OmtVPaRn2pZEU9P7sZdtHUJOAlWg7hC6atJ8uAhvbOlTXdR/YajjHuEU7/pUV/VJtslBizLXoD7CMkag4Q95DaHuwCGmVXTixwhc7CgmYZk93MEmkYlYRw93ifm5hBrhCU4/HP4MT+kH2eHzsUZ4+Hz2e0HYIkhhq+JjPAgycu0QRpBlX3nTv4M0ZeHUvgLyxE5R6SJ8grhR09/CZ7Ca1voiaTh9qnp7oasZ+wIEPEVBcNDEpe573tbZiijo22uN5VS4UqEe0MA2vTA+67BLq3m70Kh/cM20Ni3cmMJZXaH98zQOjR6WGwZglhL+NPrtZ+27UClL1+9Z7/2fReUPrXSoczYPVxhOMys3XhVcQzYHfR3MgT8BHhNAYBL6MwdYuGJSPDq45MTPUytoTHZmQVw8u349qqmZ2YO04rJAI6SsKfNBsYmNrsIKgFN89saYhkYAmEWAv7BI6gsz8Hvo45VFwGdXC/QJY3QkshEyiAlgvLTgs+VXBMCGKfgrAjCz0i8JsEG9cQSt8kmI9XWAJrukDZFRvajQpEgWIsSRpXrFx0GbAYt2A8XHQhtDfjIoLgMQ6LEKNFgUFw0EIi5dGug7KyJiEkxAIIu6EKmYg9Kl8AAKCTuRaCXC1xJWOp6WLVw8UHBolwar5KIYsUptQEILuxAHVoHEKOpCpFMZSOyiLkQq9UkfJHshkrEOySZBBBojWUCSbEXIhAJEk6DyBMgnwcQTIJ8EBcRzAEbBOoiMFBvyt+iZISABlUGR2YFKZojNdBN6oGKwaAsaMQOZio4VXJk6ILPholiuGG5Ap1MrkIlBsBFheYtAxkinIBScMLlSMAOdnvl8lcsATCsDdIpMEUI23BtKZYEBBhEXL0Rsp67pPDCY0TVUynDtgALAzqkKHNzVFmV1wMG/37V6noJF6PPR1ofQSYitAI+EK0gWPqsTQraAsLpbsIyovVL2+G4G7YDLfqd4uuBeQZiWv6N/AB+D6jl5s3l4sZtBvemSgzc73wNvCidsGdNxn8Z5t9haMq8KIQmoTBfHzPpguCnIb+Ea/XZiqoXXiRHuDjFM/vzw5sRZjH1l8cwzcUsPXykmvJWR3XDcWMfZFE5PWtu+4p+Tv7fV7KCFnYZvvTeP85R1uHEK+mB+s+nGLSgqwey+mQGMlYQ9zKCYrDodtm0BghHKhBFmErb8kwi/nImO3x7bU6ce0uU+Un+Fq3/HPemgZOjMPyLicL2jKLPplDALisDtxekksMPOj0R/dZjOV/VJRjxLdkpmHRnjk/A03Q/MuPf4AKa9uQo7noEWR3vCt31rwd2PMJsl/fq1xA8p0BYN0DzYHeXzoPrXoo0aqijtBeMx/qS7FVYrSTLvJ4el4P7rIXjS1xtFAre5s0AzwrPOvvKvWLhFLP35BTZMeEXoEWGEm2MxFu9J3UcXQPsxWXYAsPnZTTl4FMhkAWDf7ps/wsMoDv3rDfeSsTqJ+3b6ZaG5u/nxNj/zMsbx0KzIpSJ48zTkl4SSFuLztfev4BscvYwEcO0F62B6+776q5UgeIEm9rkLPzzTmbnAi5IGJc6SHOAdb1O7YX17fei0ydNRPLwpY6c+xGBm5+Er9tvFb8P2LH/L+Y8KDIte1X8idLqaNM5vpmT07XH/AS+ptnrUxRZbAAAAAElFTkSuQmCC",
};
