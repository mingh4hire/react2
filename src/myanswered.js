import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

export function Myanswered(){

    var usr = localStorage.getItem('user');
 
     var users 
     var questions
    var setQuestions
  const dispatch = useDispatch();
  
 
   [questions, setQuestions]  = useState()

    React.useEffect(()=>{
        (async()=>{
                if (!localStorage.getItem('user')) return
              users=  await data._getUsers()
              questions=  await data._getQuestions()
              usr = localStorage.getItem('user');
                if (!usr || usr.length < 2) return;
                if (!users[localStorage.getItem('user')]) return;
              setQuestions({user: users[usr], questions: questions, myQuestions: users[localStorage.getItem('user')].questions});
              dispatch({type:'users', users:users})
              dispatch({type:'questions', questions:questions})
  
          })()

    },[])
    return <div>
                {!localStorage.getItem('user') && <Redirect to="/Login" />}

         <h3>My answered questions</h3>
        {localStorage.getItem('user') && questions && questions.myQuestions && Object.keys(questions.user.answers).map(x=>{


                return <div key={x}>
                    <div >
                        {questions.questions[x].optionOne.text} number of votes ({questions.questions[x].optionOne.votes.length} votes)  or  &nbsp;
                     
                      {questions.questions[x].optionTwo.text} number of votes ({questions.questions[x].optionTwo.votes.length} votes)  <br/>
                        {/* My answer was {user.answers[x]}<br/> */}
                        <br/> 
                        my answer {questions.user.answers[x]}
                        <br/> <br/> 
                    </div>
                    </div>


        })}
    
    </div>
}

export default Myanswered;