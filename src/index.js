import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
  var store = createStore(function(state=localStorage.getItem('user'), action){
    if (action == null && localStorage.getItem('user')){
      return localStorage.getItem('user');
    }
    if (action.type == 'user'){
      localStorage.setItem('user', action.user)
      return {...state, user: action.user};
    }
    if (action.type == 'users'){
      return {...state, users: action.users};
    }
    if (action.type == 'questions'){
      return {...state, questions: action.questions};
    }
    return null;
  });

ReactDOM.render(
  
  <Provider store={store}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
