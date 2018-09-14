import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import styles from './index.less';
import { userLogin } from './reduck';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch(userLogin(values));
      }
    });
  }

  render() {
    const { form: { getFieldDecorator }, showButtonSpin } = this.props;
    return (
      <div className={styles['login-form']}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入手机号或邮箱!' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="手机号或邮箱"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <a className={styles['login-form-forgot']} href="/">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              loading={showButtonSpin}
              className={styles['login-form-button']}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  showButtonSpin: PropTypes.bool,
};
Login.defaultProps = {
  showButtonSpin: false,
};

const WrappedLogin = Form.create()(Login);

const mapStateToProps = state => ({
  showButtonSpin: state.common.showButtonSpin,
});

export default connect(mapStateToProps)(WrappedLogin);
