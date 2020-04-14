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
    let { balanceList, onTabClick } = this.props;
    // let {  } = this.state;
    return (
      <View className="vm-component">
        <View className="vm-user-balance at-row">
          {balanceList.map((bl, idx) => (
            <View
              className="at-col"
              key={bl.name}
              onClick={onTabClick.bind(this, bl, idx)}
            >
              <View className="vm-user-balance__tab ">
                <View className="name">{bl.name}</View>
                <View className="value">{bl.value}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

Index.defaultProps = {
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
  ],
  onTabClick: () => {}
};
Index.propTypes = {
  balanceList: PropTypes.array,
  onTabClick: PropTypes.func
};
