import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as data from './_Data'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const reducer = function(
  state={user:'sarahedo', users:null, questions:null}, action){
 //  if (action.type == 'user' && action.user == null && localStorage.getItem('user')){
//    return {...state , user: localStorage.getItem('user')};
// }
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
  return state
}
var questions
var users
const store = createStore(reducer);

Promise.all([
  data._getQuestions(),
  data._getUsers()

]).then(([
  questions, users

]) => {
    store.dispatch({type: 'users', users: users})
    store.dispatch({type: 'questions', questions: questions})
})
store.subscribe(x=>x);
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
