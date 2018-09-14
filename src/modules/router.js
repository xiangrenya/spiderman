import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import Login from './login';
import Home from './home';
import Movie from './movie';
import NotFoundPage from './notFoundPage';

class RouteConfig extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route key="login" exact path="/login" component={Login} />
          <Route key="home" exact path="/" component={Home} />
          <Route key="movie" exact path="/movie" component={Movie} />
          <Route key="404" exact path="/404" component={NotFoundPage} />
}
          <Route component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default RouteConfig;
