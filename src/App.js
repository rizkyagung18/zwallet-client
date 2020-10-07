import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Components/'
import Auth from './Components/auth'
import Landing from './Components/Landing/';

const App = (props) => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/auth" component={Auth} />
          <Route path="/:page/:id" component={Main} />
        </Switch>
      </Router>
    )
}

export default App