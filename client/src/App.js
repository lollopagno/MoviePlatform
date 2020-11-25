import React, {useEffect} from 'react';
import RoutesWithToken from './route/routesWithToken';
import RoutesWithoutToken from './route/routesWithoutToken';
import './App.css';
import {request} from './requests/authentication'
import {meFromTokenFailure, meFromTokenSuccess} from './redux/reducer/userReducer';
import {store} from './redux/store'
import {useSelector} from "react-redux";
import history from './history'

function App() {

    const token = useSelector(state => state.user.tokenSignIn)
    const headers = {headers: {'Authorization': 'Bearer ' + token}}

    useEffect(() => {

        if (!token || token === '') {
            // Pass - To render in page without token
        } else {
            request.meFromToken(headers).then(res => {
                store.dispatch(meFromTokenSuccess(res.data));
            }).catch(err => {
                history.push('/signIn')
                store.dispatch(meFromTokenFailure(err))
            });
        }
    })

    return (
        <div className="App">
            {token !== '' ? <RoutesWithToken/> : <RoutesWithoutToken/>}
        </div>
    );
}

export default App;
