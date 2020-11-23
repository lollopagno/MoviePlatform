import React, {useEffect} from 'react';
import Routes from './routes';
import './App.css';
import {request} from './requests/user'
import {meFromTokenFailure, meFromTokenSuccess} from './redux/reducer/userReducer';
import {store} from './redux/store'
import {useSelector} from "react-redux";

function App() {

  const token = useSelector(state => state.user.tokenSignIn)

  useEffect(() => {

    if (!token || token === '') {
      return {};
    }

    request.meFromToken(token).then(res => {
      store.dispatch(meFromTokenSuccess(res.data));
    }).catch(err => {
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
