import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux';
import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';

export function Myunanswered(){
     const dispatch = useDispatch();
    const questions = useSelector(x=>x.questions);
    const users = useSelector(x=>x.users);
    const user = useSelector(x=>x.user);
     
     var effect = React.useEffect(()=>{ (async()=>{
        var questions = await data._getQuestions();
         dispatch(QuestionsAction(questions)())

        })();
    }, []);

    var answer = function(evt){
    
        var arr = evt.target.value.split('|');
        var qid = arr[0];
        var ans =arr[1];
         (async()=>{
          await data._saveQuestionAnswer( { authedUser:user,qid: qid, answer:ans });
         var questions = await data._getQuestions()
         dispatch(QuestionsAction(questions)())
                
         })();
        
    }
    
    return <div> 
        {!user && 
          <Redirect
to={{
  pathname: "/login"
 //  search: "?utm=your+face",
 }}
/>}
        <h3>Answer some questions</h3>
        {questions && (Object.keys(questions).filter(x=>questions[x].optionOne.votes.indexOf(user) < 0 && 
       questions[ x].optionTwo.votes.indexOf(user) < 0).sort((x,y)=>-questions[x].timestamp +questions[y].timestamp) ).map(x=>
            <div key={questions[x].id}>
                Would you rather <input type='radio' name={questions[x].id} key='option1' onClick={answer} value={questions[x].id +"|optionOne"}/>
                 {questions[x].optionOne.text} or 
                <input type='radio' onClick={answer} name={questions[x].id} key='option2' value={questions[x].id +"|optionTwo"}/>
                 {questions[x].optionTwo.text} 
                </div>)


        }




    </div>
}

export default Myunanswered;