import {useState} from 'react';
import * as data from './_Data';
import  Login from './Login';
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
 export function AllQuestions(){
    var [questions, setQuestions] =useState()
    React.useEffect(()=>{
        (async()=>{
           var q =  await data._getQuestions();
            setQuestions(q);

        })();

    },[])
  
    return <div>
        {!localStorage.getItem('user') && <Redirect to="/Login" />}
            {questions && Object.keys(questions).map(x=> <div>
                {/* {"asdf+33 " + questions[x].optionOne.text} */}
                <Link to={ '/question/' +questions[x].id} >go to question {questions[x].id}</Link>
                <br/>
                Author: {questions[x].author} <br/> 
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