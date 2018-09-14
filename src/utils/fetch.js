import axios from 'axios';
import { message } from 'antd';
import {
  SHOW_SPIN,
  SHOW_BUTTON_SPIN,
  SHOW_LIST_SPIN,
  showSpin,
  showBtnSpin,
  showListSpin,
} from '../modules/reduck';
import storage from './storage';
import baseURL from '../config';

const userInfo = storage.get('userInfo');

const fetcher = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ticket: userInfo && userInfo.ticket,
  },
});

// fetcher.interceptors.request.use(
//   (config) => {
//     // 解决不传参时，Content-Type 不生效，服务器返回 415 的问题
//     if (!config.data) {
//       config.data = {};
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

fetcher.interceptors.response.use(
  (response) => {
    if (response.data.code === 120101) {
      storage.clear();
      window.location.href = '/login';
    }
    return response.data;
  },
  error => Promise.reject(error),
);

export default fetcher;

export const fetcherWithLoading = (dispatch, spinType = SHOW_SPIN) => {
  const actionCreatorMap = {
    [SHOW_SPIN]: showSpin,
    [SHOW_LIST_SPIN]: showListSpin,
    [SHOW_BUTTON_SPIN]: showBtnSpin,
  };
  const actionCreator = actionCreatorMap[spinType];
  return (method, api, arg, msg = '正在加载数据...') => new Promise((resolve, reject) => {
    dispatch(actionCreator({ bool: true, content: msg }));
    let request;
    if (method === 'get') {
      request = fetcher[method](api, { params: arg });
    } else {
      request = fetcher[method](api, arg);
    }
    request.then((res) => {
      resolve(res);
    })
      .catch((error) => {
        message.error('请求异常');
        reject(error);
      })
      .finally(() => {
        dispatch(actionCreator({ bool: false, content: '' }));
      });
  });
};
