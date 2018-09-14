import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

function ErrorPage(props) {
  const {
    className, type, title, desc, img,
  } = props;
  const clsString = classNames(styles.exception, className);
  return (
    <div
      className={clsString}
    >
      <div className={styles['img-block']}>
        <div
          className={styles['img-ele']}
          style={{ backgroundImage: `url(${img || config[type].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[type].title}</h1>
        <div className={styles.desc}>{desc || config[type].desc}</div>
        <div className={styles.actions}>
          <Link to="/"><Button type="primary">返回首页</Button></Link>
        </div>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  img: PropTypes.string,
};

ErrorPage.defaultProps = {
  className: '',
  type: '404',
  title: '',
  desc: '',
  img: '',
};

export default ErrorPage;
