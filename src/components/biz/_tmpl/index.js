import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // let {  } = this.props;
    // let {  } = this.state;
    return <View className="vm-component"></View>;
  }
}

Index.defaultProps = {
  name: "",
};

Index.propTypes = {
  name: PropTypes.string,
};
