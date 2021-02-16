import {useState} from 'react';
import * as data from './_Data';
import  Login from './Login';
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
 export function AllQuestions(){
    const selector = useSelector(state=>state) 
    const dispatch = useDispatch() 
    const loggedin = selector && selector.user;
    var [questions, setQuestions] =useState()
    React.useEffect(()=>{
        (async()=>{
           var q =  await data._getQuestions();
            setQuestions(q);
             dispatch({type:'questions', questions:questions})
        
        })();

    },[])
  
    return <div>
        {!localStorage.getItem('user') && !loggedin && <Redirect to="/Login" />}
            {questions && Object.keys(questions).map(x=> <div>
                {/* {"asdf+33 " + questions[x].optionOne.text} */}
                <br/>
                Author: {questions[x].author} <img src={selector.users[questions[x].author].avatarURL} width={32} height={32}/>         
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