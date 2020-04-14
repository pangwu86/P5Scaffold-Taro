import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { Text } from "@tarojs/components";
import "./index.scss";

export default class VmHeader extends Component {
  render() {
    const { prefixClass, name, color, size } = this.props;
    const className = `${prefixClass} ${prefixClass}-${name}`;
    const style = `font-size:${size}px; color:${color};`;
    return <Text className={className} value={name} style={style}></Text>;
  }
}

VmHeader.defaultProps = {
  prefixClass: "mdi",
  name: "",
  color: "",
  size: "",
};

VmHeader.propTypes = {
  refixClass: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};
