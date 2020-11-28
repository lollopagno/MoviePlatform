import React, {useEffect} from 'react';
import RoutesWithToken from './route/routesWithToken';
import RoutesWithoutToken from './route/routesWithoutToken';
import './App.css';
import {authentication} from './requests/authentication'
import {meFromTokenFailure, meFromTokenSuccess} from './redux/reducer/tokenReducer';
import {store} from './redux/store'
import {useSelector} from "react-redux";
import history from './history'

function App() {

    const token = useSelector(state => state.token.signIn)
    const headers = {headers: {'Authorization': token === undefined? '': 'Bearer ' + token}}

    useEffect(() => {

        if (!token || token === '') {
            // Pass - To render in page without token
        } else {
            authentication.meFromToken(headers).then(res => {
                store.dispatch(meFromTokenSuccess(res.data.token));
            }).catch(err => {
                history.push('/signIn')
                store.dispatch(meFromTokenFailure(err))
            });
        }
    })

    return (
        <div className="App">
            {token ? <RoutesWithToken/> : <RoutesWithoutToken/>}
        </div>
    );
}

export default App;
