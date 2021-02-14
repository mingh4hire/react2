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

<Router>
    {currentuser && 
    <Route path="/" render={(props)=>{
      return <div>
          Welcome {currentuser}
          
      </div>
    }}>
    

    </Route>
    
    
    }
    {currentuser && 
      <Link to="/leaderboard">Go to leaderboard</Link>
    }&nbsp;
    {currentuser && 
      <Link to="/myunanswered">See unanswered</Link>
    } &nbsp;
    {currentuser && 
      <Link to="/myanswered">See answered</Link>
    } &nbsp;
    {currentuser && 
      <Link to="/newquestion">Create question</Link>
    }&nbsp;
    
    {currentuser && 
      <Link onClick={logout}> log out</Link>
    }
    
    

 


    <Route path="/myquestions"  component={myquestions}/>
    <Route path="/myanswered"  component={Myanswered}/>
    <Route path="/myunanswered"  component={Myunanswered}/>
    <Route path="/leaderboard"  component={Leaderboard}/>
 

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
 <Route path="/newquestion" component={Newquestion      }   />

    {!currentuser &&  
     <Redirect
     to={{
       pathname: "/login",
      //  search: "?utm=your+face",
       state: { referrer: 23 }
     }}
   />}
         

     {currentuser && <div>
 
       
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
