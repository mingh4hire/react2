import {useState} from 'react';
import * as data from './_Data';
import  Login from './Login';
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';

 export function AllQuestions(){
    const questions = useSelector(state=>state.questions) 
    const users = useSelector(state=>state.users )
    const user = useSelector(state=>state.user) 
    const dispatch = useDispatch() 
     React.useEffect(()=>{
        (async()=>{
           var q =  await data._getQuestions();
              dispatch(QuestionsAction(questions)())
        
        })();

    },[])
  
    return <div>

        { !user && <Redirect to="/Login" />}
            {user && users && questions && Object.keys(questions).map(x=> <div>
                
                <br/>
                Author: {questions[x].author} <img src={users[questions[x].author].avatarURL} width={32} height={32}/>         
                       <Link to={ '/question/' +questions[x].id} >go to question 
                 </Link>
 <br/> 
                Would you rather <span style={{color:'blue'}} >{ questions[x].optionOne.text } </span>
                
                {questions[x].optionOne.votes.length} votes
                or  <br/>
                <span style={{color:'red'}} >{ questions[x].optionTwo.text } </span>                
                {questions[x].optionTwo.votes.length} votes
                <br/><br/>
                </div>
                  
                
            )}
 
    </div>
}

export default AllQuestions;