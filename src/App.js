import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import Login from './Login';

import {useState } from 'react'
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import myquestions from './myquestions';
import Leaderboard from './leaderboard';
import Newquestion from './newquestion';
 import Myanswered from './myanswered';
import Myunanswered from './myunanswered';
import Question from './Question';
function App() {
  function logout(){
    localStorage.setItem('user', null);
    setcurrentuser()
  }
   const  [users, setusers ] = useState()
  const  [currentuser, setcurrentuser ] = useState()
  const  [questions, setquestions ] = useState()
  React.useEffect(()=>{ (async()=>{
    let isMounted = true
    var  users = await data._getUsers();
    var  questions = await data._getQuestions();
    setusers(users);
    setquestions(questions);
   })();
}, []);
  return (


    <div className="App">
<h3>Would you rather...</h3>
<Router>
    {(localStorage.getItem('user') || currentuser) && 
    <Route path="/" render={(props)=>{
      return <div>
          Welcome {currentuser}
          
      </div>
    }}>
    

    </Route>
    
    
    }
    {(localStorage.getItem('user') || currentuser) && 
      <Link to="/leaderboard">Go to leaderboard</Link>
    }&nbsp;
    {(localStorage.getItem('user') || currentuser) && 
      <Link to="/myunanswered">See unanswered</Link>
    } &nbsp;
    {(localStorage.getItem('user') || currentuser) && 
      <Link to="/myanswered">See answered</Link>
    } &nbsp;
    {(localStorage.getItem('user') || currentuser) && 
      <Link to="/add">Create question</Link>
    }&nbsp;

    

    {(localStorage.getItem('user') || currentuser) && 
      <Link onClick={logout}> log out</Link>
    }
    
    

 


    <Route path="/myquestions"  component={myquestions}/>
    <Route path="/myanswered"  component={Myanswered}/>
    <Route path="/myunanswered"  component={Myunanswered}/>
    <Route path="/leaderboard"  component={Leaderboard}/>
    <Route path="/question/:question_id"  component={Question}/>
    

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
 <Route path="/add" component={Newquestion      }   />

    {(!localStorage.getItem('user') && !currentuser) &&  
     <Redirect
     to={{
       pathname: "/login"
      //  search: "?utm=your+face",
      }}
   />}
         

     {localStorage.getItem('user')  && <div>
 
       
       <Route exact path="/">
     <h3>My Questions that I authored</h3> 
       {questions && Object.keys(questions).filter(x=> questions[x].author == currentuser).map(x=>
          
          <div key={x}>
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
