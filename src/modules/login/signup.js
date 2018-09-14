import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

class SignUp extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({ confirmDirty: prevState.confirmDirty || !!value }));
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码输入密码不一致');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱格式',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="邮箱"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="手机号"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请输入确认密码',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="确认密码"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ],
              })(<Input placeholder="验证码" />)}
            </Col>
            <Col span={12}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              我已阅读并接受
              <a href="/assignment">《用户协议》</a>
            </Checkbox>,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className={styles['login-form-button']}
          >
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
}

SignUp.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

const WrappedSignUp = Form.create()(SignUp);

export default WrappedSignUp;
