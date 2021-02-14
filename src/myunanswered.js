import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
export function Myunanswered(){
    var user =localStorage.getItem('user');
    var setquestions
    var questions
       [questions, setquestions ] = useState()
    var effect = React.useEffect(()=>{ (async()=>{
        questions = await data._getQuestions();
        setquestions(questions);
        })();
    }, []);

    var answer = function(evt){
    
        var arr = evt.target.value.split('|');
        var qid = arr[0];
        var ans =arr[1];
         (async()=>{
        await data._saveQuestionAnswer( { authedUser:user,qid: qid, answer:ans })
        setquestions(await data._getQuestions());
         })();
        
    }
    
    return <div> 
        
        <h3>Answer some questions</h3>
        {questions && Object.keys(questions).filter(x=>questions[x].optionOne.votes.indexOf(user) < 0 && 
       questions[ x].optionTwo.votes.indexOf(user) < 0 ).map(x=>
            <div key={questions[x].id}>
                Would you rather <input type='radio' name={questions[x].id} key='option1' onClick={answer} value={questions[x].id +"|optionOne"}/> {questions[x].optionOne.text} or 
                <input type='radio' onClick={answer} name={questions[x].id} key='option2' value={questions[x].id +"|optionTwo"}/> {questions[x].optionTwo.text} 
                </div>)


        }




    </div>
}

export default Myunanswered;