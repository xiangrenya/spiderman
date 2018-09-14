## 技术栈

react + react-dom + redux + react-redux + react-router-dom + connected-react-router + react-action + react-thunk + + axios + antd

## 项目初始化

```
npx create-react-app blog
cd blog
npm i
npm run eject // 展开项目中的配置
```

## 项目结构

```
src
├── assets                            # 静态资源
│   └── images                        # 项目中的图片资源，按页面归档
│       ├── home
│       │   └── logo.svg
│       └── login
├── config.js                         # 应用环境配置，如api地址前缀
├── index.js                          # 应用入口
├── modules                           # 按模块划分
│   ├── apis.js                       # 所有api的路径配置
│   ├── components                    # 通用组件
│   ├── dict.js                       # 字典
│   ├── home                          # 每个模块至少3个文件
│   │   ├── index.js                  # connect 组件
│   │   ├── index.less                # 模块样式
│   │   └── reduck.js                 # 鸭子模型，包含 actionType, actionCreator 和 reducer
│   ├── reducer.js                    # 所有模块下的reduck都会汇总到这个文件，用于createStore
│   ├── reduck.js                     # 全局通用reduck
│   └── router.js                     # 应用路由管理
├── registerServiceWorker.js
├── store                             # 配置store
│   ├── DevTools.js
│   ├── configureStore.dev.js
│   ├── configureStore.js
│   └── configureStore.prod.js
└── utils                             # 工具类
    ├── cookie.js                     # 操作cookie
    ├── fetch.js                      # 请求api服务
    ├── helper.js
    ├── storage.js                    # 操作localStorage
    └── utils.js
```

## 项目规范

前端JavaScript代码规范遵循：[Airbnb](https://github.com/airbnb/javascript)
统一代码风格，可以使用格式化代码工具：Pretiter

## 开发者工具

redux-devtools + redux-devtools-dock-monitor + redux-devtools-log-monitor


## `Reduck` 模式

每个子模块中均有个一 `reduck.js` 文件，该文件的基本格式如下：

```javascript
import { createAction, handleAction } from 'redux-action'
// ActionTypes
export INCREMENT = 'INCREMENT'
// ActionCreators
export increment = createAction(INCREMENT)
// Reducer
const defaultState = {counter: 0}
const reducer = handleAction(
  increase, 
  (state, action) => ({
      ..state, 
      counter: state.counter + 1
    }), defaultState)
export default reduer
```

这是采用了一种称为 "鸭子模式" 的思想，将该模块的所有 redux 相关操作放在单独的文件中维护，契合我们拆分 module 的需要

## 引用常用资源

现在在 webpack 配置了 alias 方便引用资源，举个例子当你在某个视图组件中需要引用公共组件，不管你与那个组件的相对路径是怎样的，可以直接 `import AddButton from 'Components/AddButton'`

目前可以这样引用的有：

- Utils: 对应 'src/utils/'
- Components: 对应 'src/components/',
- Assets: 对应 'src/assets/',
- Global: 对应 'src/global/'
- Modules: 对应 'src/modules/'

## 通用组件或方法

### fetch 使用

在项目开发中，发送请求常常伴随 loading 效果处理，项目中通常使用 fetch，针对普遍使用场景将 loading 的效果相关代码封装到fetch等中。

将 loading 的效果分为三种类型：
- 全局 loading(SHOW_SPIN) 应用场景:详情、编辑页面等
- 按钮 loading(SHOW_BUTTON_SPIN) 应用场景：表单页面，保存提交按钮的 loading 效果
- 列表 loading(SHOW_LIST_SPIN )应用场景：列表页面如 Table 等组件的加载效果

需保证当前页面 loading 类型只能使用一次

fetch 使用方式：

```javascript

import fetchData from 'Utils/fetch'

// 1. 不使用 fetch 封装的处理 loading（如果需要自定义 loading 只能在 reduck 单独处理）
fetchData(api, args)

// 2. 使用 fetch 封装的 loading 代码
// dispatch => redux dispatch
// SHOW_SPIN、SHOW_BUTTON_SPIN、SHOW_LIST_SPIN
fetchData(dispatch, SHOW_LIST_SPIN)(api, args)
```

## 列表页面

典型的列表页面包含一下三个部分：

- 搜索项 `filter`
- 列表内容 `list`
- 分页 `page`

根据三者的数据流向，可以生成一些通用的模板，方便大家实现列表页面，具体规则如下：

### `reduck.js`

```javascript
import { createAction } from 'redux-actions'
import { fetchSupplyChain as fetchData } from 'Utils/fetch'
import { SHOW_SPIN, SHOW_LIST_SPIN } from 'Global/action'
import { ReduckHelper } from 'Utils/helper'
import { message } from 'antd'

// ===========================> Action Types <=========================== //

const GET_CHECK_LIST = 'spa/SupplyChain/depotStock/GET_CHECK_LIST'  // 库存查询

// ===========================> Actions <=========================== //

export const getCheckList = arg =>
 ReduckHelper.genListAction(arg, fetchData, apis.depot.stock.check, GET_CHECK_LIST)

// ===========================> Reducer <=========================== //

const initialState = {
  ...ReduckHelper.genListState('check', { // 注入除 page 以外的参数
    skuNo: '',
    goodsName: '',
    // ...
  })
}

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    // ...
    case GET_CHECK_LIST:
      return ReduckHelper.resolveListState('check', state, action.payload)
    default:
      return state
  }
}
```

### 列表页

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd'

import * as urls from 'Global/urls'
import { isEmpty } from 'Utils/lang'
import { genPlanColumn, genSelectColumn, genPagination, unshiftIndexColumn } from 'Utils/helper'
import Filter from 'Components/Filter'

import { getCheckList } from '../reduck'

class StockCheck extends Component {
  componentWillMount() {
    const { dispatch, list, filter } = this.props
    isEmpty(list) && dispatch(getCheckList(filter))
  }

  _columns = [
    genPlanColumn('skuNo', 'SKU 编码'),
    genSelectColumn('status', '库存状态', StockStatus),
    {
      key: 'operation',
      title: '操作',
      render: (text, record) => {},
    },
  ]

  _handleSearch = searchData => {
    const { filter, dispatch } = this.props
    const finalFilter = { ...filter, ...searchData, currentPage: 1 }
    dispatch(getCheckList(finalFilter))
  }

  _handleChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter)
    const { filter, dispatch, page } = this.props
    const { current, pageSize } = pagination
    const finalFilter = { ...filter, currentPage: page.pageSize !== pageSize ? 1 : current, pageSize }
    dispatch(getCheckList(finalFilter))
  }

  _genFilterFields = () => {
    const { filter } = this.props
    const fields = [
      {
        key: 'skuNo',
        label: 'SKU 编码',
        initialValue: filter.skuNo,
        type: 'Input',
      }, {
        key: 'goodsCatgNo',
        label: '所属分类',
        initialValue: filter.goodsCatgNo,
        element: (...)
      }, {
        key: 'status',
        label: '库存状态',
        initialValue: filter.status || '',
        type: 'Select',
        content: StockStatus
      }
    ]
    return fields
  }

  render() {
    const { showListSpin, list, page, orgLevel } = this.props
    const finalColumns = unshiftIndexColumn(this._columns, page, { // 根据需要插入序号
      fixed: 'left',
    })
    const fields = this._genFilterFields()
    const extraBtns = orgLevel === '2' ? [
      <Button key='export' type='primary' onClick={...}>导出</Button>
    ] : []
    const pagination = genPagination(page)

    return (
      <div>
        <Filter fields={fields} onSearch={this._handleSearch} extraBtns={extraBtns} />
        <Table
          // style={{ width: '100%' }}
          pagination={pagination}
          columns={finalColumns}
          onChange={this._handleChange}
          rowKey='skuNo'
          dataSource={list}
          loading={showListSpin}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showListSpin: state.common.showListSpin,

    list: state.supplyChain.depotStock.checkList,
    filter: state.supplyChain.depotStock.checkFilter,
    page: state.supplyChain.depotStock.checkPage,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(StockCheck)

```

## 常见问题

- 列表页，filter 不统一，导致请求的结果有误，可以根据以下步骤自测

  改变搜索条件 => 查询 => 翻页 （数据对否，页码是否正确） => 改变 pageSize （数据对否，页码回到 1） => 查询  （数据对否，页码是否正确）

- 样式不统一，请参考 [交互规范](https://elephant-fe.github.io/guide/docs/ui/design.html)，
