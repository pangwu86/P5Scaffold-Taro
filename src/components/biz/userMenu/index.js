import Taro, { Component } from "@tarojs/taro";
import PropTypes from "prop-types";
import { View, Block, Image, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let { menu, onClick } = this.props;
    // let {  } = this.state;
    return (
      <View className="vm-component">
        {/* <View className="vm-user-menu">
          <AtList>
            {menu.map((m, idx) => (
              <Block key={new Date().getTime() + idx}>
                {m.title && !m.type && (
                  <AtListItem
                    onClick={onClick.bind(this, m, idx)}
                    key={m.title}
                    title={m.title}
                    arrow={m.arrow}
                    thumb={m.thumb}
                  />
                )}
              </Block>
            ))}
          </AtList>
        </View> */}
        <View className="vm-user-menu">
          {menu.map((m, idx) => (
            <Block key={new Date().getTime() + idx}>
              {/* 分割 */}
              {(m.title == undefined || m.type == "divider") && (
                <View className="vm-divider" key={new Date().getTime()}></View>
              )}
              {m.title && (
                <View
                  className={[
                    "vm-user-menu__list-item",
                    m.border && "has-border"
                  ]}
                  onClick={onClick.bind(this, m, idx)}
                  key={m.title}
                >
                  {/* 左边 */}
                  <View className="left">
                    <View className="thumb">
                      <Image
                        src={m.thumb}
                        mode="aspectFit"
                        className="img"
                      ></Image>
                    </View>
                    <View className="title">{m.title}</View>
                  </View>
                  {/* 右边 */}
                  <View className="right">
                    <AtIcon
                      value="chevron-right"
                      size="20"
                      color="#ccc"
                    ></AtIcon>
                  </View>
                  {/* 隐形按钮 */}
                  {m.type == "button" && (
                    <Button
                      className="vm-hide-btn"
                      openType={m.openType}
                    ></Button>
                  )}
                </View>
              )}
            </Block>
          ))}
        </View>
      </View>
    );
  }
}

Index.defaultProps = {
  menu: [
    {
      title: "标题文字",
      arrow: "right"
    },
    {},
    {
      title: "标题文字2",
      arrow: "right"
    },
    {
      type: "divider"
    },
    {
      title: "标题文字3",
      arrow: "right"
    }
  ],
  onClick: () => {}
};

Index.propTypes = {
  menu: PropTypes.array,
  onClick: PropTypes.func
};
