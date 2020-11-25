import React, {Component} from "react";
import {Router, Redirect, Switch, Route} from "react-router-dom";
import history from '../history';
import ValidateEmail from '../components/authentication/email/validationEmail'
import Dashboard from '../components/dashboard'
import Error from "../components/error";

export default class RoutesWithToken extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/signIn"/>
                    <Route path='/confirmation' component={ValidateEmail}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        )
    }
}
