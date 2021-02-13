import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import Login from './Login';

import {useState } from 'react'
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import myquestions from './myquestions';
// import myanswered from './myanswered';
import Myunanswered from './myunanswered';
function App() {
  const  [users, setusers ] = useState()
  const  [currentuser, setcurrentuser ] = useState()
  const  [questions, setquestions ] = useState()
  React.useEffect(()=>{ (async()=>{
    var  users = await data._getUsers();
    var  questions = await data._getQuestions();
    setusers(users);
    setquestions(questions);
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
    <Route path="/myunanswered"  component={Myunanswered}/>
 

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
      //  search: "?utm=your+face",
       state: { referrer: 23 }
     }}
   />}
         

     {currentuser && <div>
      <Link to="myunanswered">answer some questions</Link>

       
       <Route exact path="/">
     <h3>My Questions that I authored</h3> 
       {questions && Object.keys(questions).filter(x=> questions[x].author == currentuser).map(x=>
          
          <div>
            Would you rather <br/>
                {questions[x].optionOne.text } or   {questions[x].optionTwo.text }
                <br/>
                <br/>

                 </div>)
                        }

</Route>

                        </div>}
                        </Router>


                             </div>


  )
    }
export default App;
