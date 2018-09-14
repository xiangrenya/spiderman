import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import logo from '../../assets/images/home/logo.svg';
import { increment, decrement } from './reduck';
import './index.less';

class Home extends React.Component {
  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch(increment());
  }

  handleReduce = () => {
    const { dispatch } = this.props;
    dispatch(decrement());
  }

  render() {
    const { counter } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          {' '}
          <code>src/App.js</code>
          {' '}
and save to reload.
        </p>
        <h1>{counter}</h1>
        <Button type="primary" onClick={this.handleAdd}>
          增加
        </Button>
        <Button type="primary" onClick={this.handleReduce}>
          减少
        </Button>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/movie">movie</Link>
          </li>
          <li>
            <Link to="/404">404</Link>
          </li>
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  counter: state.home.counter,
});

export default connect(mapStateToProps)(Home);
