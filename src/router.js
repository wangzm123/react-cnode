import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';
import Con from './routes/Main';
function RouterConfig({ hasHistory, app }) {
  const IndexPage = dynamic({
    app,
    component: () =>  import('./routes/IndexPage')
  });
  const Detail = dynamic({
    app,
    models: () => [import ('./models/Detail')],
    component: () => import ('./routes/Detail'),
  })
  return (
    <HashRouter history={hasHistory}>
      <Con>
        <Route path="/" exact component={IndexPage} />
        <Route path='/detail/:id/:name'  component={Detail} />
      </Con>
    </HashRouter>
  );
}

export default RouterConfig;
