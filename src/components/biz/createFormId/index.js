import Taro, { Component } from "@tarojs/taro";
import { Button, Form } from "@tarojs/components";
import "./index.scss";
import API from "@services/api";

// 小程序模板消息接口将于2020年1月10日下线，开发者可使用订阅消息功能
// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html

export default class CreateFormId extends Component {
  constructor(props) {
    super(props);
  }
  formSubmit(e) {
    let formId = e.detail.formId;
    console.log("formId:", formId);
    // 没有空格啥的
    if (formId && formId.indexOf(" ") == -1) {
      API.collectFormId({ formId }).then(res => {
        console.log(JSON.stringify(res));
      });
    }
  }
  render() {
    let { children } = this.props;
    return (
      <Form
        className="form"
        reportSubmit="true"
        onSubmit={this.formSubmit.bind(this)}
      >
        <Button className="form-btn" formType="submit">
          {children}
        </Button>
      </Form>
    );
  }
}
