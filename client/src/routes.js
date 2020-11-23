import React, {Component} from "react";
import {Router, Redirect, Switch, Route} from "react-router-dom";
import history from './history';

import SignIn from './components/authentication/signIn/signIn'
import SignUp from './components/authentication/signUp/signUp'
import ValidateEmail from './components/authentication/email/validationEmail'
import ResendToken from './components/authentication/email/dashboardEmail'
import Dashboard from './components/dashboard'
import Error from "./components/error";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/signIn" />
                    <Route path='/signIn' component={SignIn} exact/>
                    <Route path='/signUp' component={SignUp} />
                    <Route path='/resendToken' component={ResendToken} />
                    <Route path='/confirmation' component={ValidateEmail} />
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        )
    }
}
