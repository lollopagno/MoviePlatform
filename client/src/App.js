import React, {useEffect} from 'react';
import Routes from './routes';
import './App.css';
import {request} from './requests/user'
import {meFromTokenFailure, meFromTokenSuccess} from './redux/reducer/userReducer';
import {store} from './redux/store'

function App() {

  useEffect(() => {

    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') {
      return {};
    }

    request.meFromToken(token).then(res => {
      sessionStorage.setItem('jwtToken', res.data.token);
      store.dispatch(meFromTokenSuccess(res.data.user));
    }).catch(err => {
      sessionStorage.removeItem('jwtToken');
      store.dispatch(meFromTokenFailure(err.response.data.message))
    });
  })

  return (
      <div className="App">
        <Routes/>
      </div>
  );
}
export default App;
