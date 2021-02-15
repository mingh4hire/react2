import * as data from './_Data';
import {useState} from 'react';
import React from 'react';

export function Myanswered(){

    var usr = localStorage.getItem('user');
 
     var users 
     var questions
    var setQuestions
 
 
   [questions, setQuestions]  = useState()

    React.useEffect(()=>{
        (async()=>{

              users=  await data._getUsers()
              questions=  await data._getQuestions()
              usr = localStorage.getItem('user');

  
              setQuestions({user: users[usr], questions: questions, myQuestions: users[localStorage.getItem('user')].questions});
          })()

    },[])
    return <div>
        
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