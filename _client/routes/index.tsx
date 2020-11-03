import * as React from 'react';
import App from '@pages/App';
import {createBrowserHistory} from 'history';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
/** history */
export const history = createBrowserHistory();

export default class extends React.Component<any, any> {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Redirect from="/" to="/pages/index" exact />
            <Redirect from="/pages/" to="/pages/index" exact />
            <Route path="/pages/" render={props => <App {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}