import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';

export function Myanswered(){

    var usr = localStorage.getItem('user');
  const user = useSelector(state=>state.user);
     const users  = useSelector(state=>state.users)
     const questions = useSelector(state=>state.questions)
   const dispatch = useDispatch();
  
 
 
    React.useEffect(()=>{
        (async()=>{
              var  users=  await data._getUsers()
             var questions=  await data._getQuestions()
                 dispatch(UsersAction(users)())
              dispatch( QuestionsAction(questions)())
  
          })()

    },[])
    return <div>
      {( !user  ) &&
    <Redirect
to={{
  pathname: "/login"
 //  search: "?utm=your+face",
 }}
/>}
 
         <h3>My answered questions</h3>
        {  user && questions && users && users[user].questions && Object.keys(users[user].answers).map(x=>{


                return <div key={x}>
                    <div > Would you rather ...
                       <span style={{color:'blue'}}> {questions[x].optionOne.text} </span>  ({questions[x].optionOne.votes.length} votes)  or  &nbsp;
                     
                       <span style={{color:'red'}}>  {questions[x].optionTwo.text} </span>   ({questions[x].optionTwo.votes.length} votes)  <br/>
                        {/* My answer was {user.answers[x]}<br/> */}
                        <br/> 
                        My answer: {users[user].answers[x]}
                        <br/> <br/> 
                    </div>
                    </div>


        })}
    
    </div>
}

export default Myanswered;