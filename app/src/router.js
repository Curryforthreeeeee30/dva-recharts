import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Home from './routes/Home';
import QuestionOne from './routes/QuestionOne';
import QuestionTwo from './routes/QuestionTwo';
import QuestionThree from './routes/QuestionThree';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRoute component={Home} />
        <Route path="/sub1" component={QuestionOne}/>
        <Route path="/sub2" component={QuestionTwo}/>
        <Route path="/sub3" component={QuestionThree}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
