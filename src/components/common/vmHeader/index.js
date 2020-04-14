import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import "./index.scss";

export default class VmHeader extends Component {
  render() {
    const { title, pos } = this.props;
    return (
      <View className="vm-header">
        <View className={["vm-header__title", pos]}>{title}</View>
      </View>
    );
  }
}

VmHeader.defaultProps = {
  title: "默认标题",
  pos: "bottom",
};

VmHeader.propTypes = {
  title: PropTypes.string,
  pos: PropTypes.string,
};
