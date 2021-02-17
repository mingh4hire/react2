import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import Login from './Login';

 import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'

import MyQuestions from './MyQuestions';
import Leaderboard from './leaderboard';
import Add from './Add';
 import Myanswered from './myanswered';
import Myunanswered from './myunanswered';
import Question from './Question';

import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';

import {useDispatch, useSelector} from 'react-redux'
import AllQuestions from './AllQuestions';
 
 function App() {
const dispatch = useDispatch( );
   

  function logout(){
    // localStorage.setItem('user', null);
    dispatch(UserAction(null)() );

   }
   React.useEffect(()=>{ (async()=>{
     var  users = await data._getUsers();
    var  questions = await data._getQuestions();
     dispatch(UsersAction(users)())
    dispatch(QuestionsAction(questions)())
   })();
}, []);
const user= useSelector(x=>x.user);
const users= useSelector(x=>x.users);
const questions= useSelector(x=>x.questions);

  return (


    <div className="App">

      
<h3>Would you rather...</h3>
<Router>

{!user && 
          <Redirect
          to={{
            pathname: "/login"
           //  search: "?utm=your+face",
           }}
          />
        }
    { ( user) && 
    <Route path="/" exact render={(props)=>{
      return <div>
          Welcome {( user)}
          
      </div>
    }}>
    

    </Route>
    
    
    }
    {(localStorage.getItem('user') || ( user)) && 
      <Link exact to="/">Home</Link>
    }&nbsp;
    {(localStorage.getItem('user') || ( user)) && 
      <Link to="/leaderboard">Go to leaderboard</Link>
    }&nbsp;
    {(localStorage.getItem('user') || ( user)) && 
      <Link to="/myunanswered">See unanswered</Link>
    } &nbsp;
    {(localStorage.getItem('user') || ( user)) && 
      <Link to="/myanswered">See answered</Link>
    } &nbsp;
    {(localStorage.getItem('user') || ( user)) && 
      <Link to="/add">Create question</Link>
    }&nbsp;
    {(localStorage.getItem('user') || ( user)) && 
      <Link to="/allquestions">All Questions</Link>
    }&nbsp;

    

    {(localStorage.getItem('user') || ( user)) && 
      <Link onClick={logout}> Log out</Link>
    }
    <Route path="/myquestions"  component={MyQuestions}/>
    <Route path="/myanswered"  component={Myanswered}/>
    <Route path="/myunanswered"  component={Myunanswered}/>
    <Route path="/leaderboard"  component={Leaderboard}/>
    <Route path="/allquestions"  component={AllQuestions}/>
    <Route path="/question/:question_id"  component={Question}/>
    <Route path="/add" component={Add}   />


    <Route path="/yourquestions" render={(props)=>{
      return <div>
          Welcome {user} here's your questions
        
      </div>
    }}>
    
    
    </Route>
    <Route path="/login" component={
      ()=>
      <Login    />
      
      }   />

    {( !( user)   || !localStorage.getItem('user')) &&  
     <Redirect
     to={{
       pathname: "/login"
      //  search: "?utm=your+face",
      }}
   />}
     { ( user) &&
     
    <Route path="/"exact  component={AllQuestions}/>
    
     }

     {localStorage.getItem('user')  && <div>
 
       
       <Route exact path="/">
     <h3>My questions that I authored</h3> 
       { questions && Object.keys(questions).filter(x=> questions[x].author == user).map(x=>
          
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
