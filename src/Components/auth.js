import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AuthLogo from './AuthLogo/'
import Login from './Login/'
import Register from './Register/'
import Success from './AuthSuccess/'
import Forgot from './Forgot/'

const Auth = (props) => {
    return (
        <Router history={createBrowserHistory}>
            <div className="d-flex flex-lg-row flex-column">
                <AuthLogo />
                <Switch>
                    <Route exact path="/auth/login" component={() => <Login {...props} />} />
                    <Route exact path="/auth/register" component={Register} />
                    <Route exact path="/auth/success" component={Success}/>
                    <Route exact path="/auth/forgot" component={Forgot} />
                </Switch>
            </div>
        </Router>
    )
}

export default Auth