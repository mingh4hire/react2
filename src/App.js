import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import Login from './Login';

import {useState } from 'react'
import React from 'react'
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom'
import myquestions from './myquestions';
// import myanswered from './myanswered';
import myunanswered from './myunanswered';
function App() {
  const  [users, setusers ] = useState()
  const  [currentuser, setcurrentuser ] = useState()
  React.useEffect(()=>{ (async()=>{
    var  users = await data._getUsers();
      setusers(users);
alert(JSON.stringify(users));
    //  alert('users is ' + JSON.stringify(Object.keys(users)));
  })();
}, []);
  return (


    <div className="App">

<Router>
    {currentuser && 
    <Route path="/" render={(props)=>{
      return <div>
          Welcome {currentuser}
        
      </div>
    }}>
    

    </Route>}

    <Route path="/myquestions"  component={myquestions}/>
    {/* <Route path="/myanswered"  component={myanswered}/> */}
    <Route path="/myunanswered"  component={myunanswered}/>
 

    <Route path="/yourquestions" render={(props)=>{
      return <div>
          Welcome {currentuser} here's your questions
        
      </div>
    }}>
    
    
    </Route>
    <Route path="/login" component={
      ()=>
      <Login users={users} setusers={setusers} setcurrentuser={setcurrentuser} currentuser={currentuser}/>
      
      }   />

    {!currentuser &&  
     <Redirect
     to={{
       pathname: "/login",
       search: "?utm=your+face",
       state: { referrer: 23 }
     }}
   />}
         
 </Router>

       

      </div>
  );
}

export default App;
