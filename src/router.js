import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';
import Con from './routes/Main';
function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () =>  import('./routes/IndexPage')
  });
  const Detail = dynamic({
    app,
    models: () => [import ('./models/Detail')],
    component: () => import ('./routes/Detail'),
  });
  const Login = dynamic ({
    app,
    models: () => [import ('./models/User')],
    component: () => import ('./routes/Login')
  })
  const User = dynamic ({
    app,
    models: () => [import ('./models/User')],
    component: () => import ('./routes/User')
  })
  const NotFound = dynamic ({
    app,
    component: () => import ('./routes/Notfound')
  })


  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path='/detail/:id/:name'  component={Detail} />
        <Route path='/login' component={Login}/>
        <Route path='/user' component={User}/>
        <Route path='/notfound' component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
