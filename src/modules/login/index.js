import React from 'react'
import { Tabs } from 'antd'
import Login from './login'
import Signup from './signup'
import styles from './index.less'

const TabPane = Tabs.TabPane

export default class LoginPage extends React.Component {
  onTabChange = key => {
    console.log(key)
  }
  render() {
    return (
      <div className={styles['login-container']}>
        <div className={styles['tab-container']}>
          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab="登录" key="1">
              <Login />
            </TabPane>
            <TabPane tab="注册" key="2">
              <Signup />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
