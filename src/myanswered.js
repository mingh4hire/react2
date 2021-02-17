import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

export function Myanswered(){

    var usr = localStorage.getItem('user');
  const selector = useSelector(x=>x);
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
        {localStorage.getItem('user') && selector && selector.questions && selector.users && selector.users[selector.user].questions && Object.keys(selector.users[selector.user].answers).map(x=>{


                return <div key={x}>
                    <div >
                        {selector.questions[x].optionOne.text} number of votes ({selector.questions[x].optionOne.votes.length} votes)  or  &nbsp;
                     
                      {selector.questions[x].optionTwo.text} number of votes ({selector.questions[x].optionTwo.votes.length} votes)  <br/>
                        {/* My answer was {user.answers[x]}<br/> */}
                        <br/> 
                        my answer {selector.users[selector.user].answers[x]}
                        <br/> <br/> 
                    </div>
                    </div>


        })}
    
    </div>
}

export default Myanswered;