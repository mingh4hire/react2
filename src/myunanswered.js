import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
export function Myunanswered(){
    var props = {}
    props.id = localStorage.getItem('user');
    var setquestions
    var questions
       [questions, setquestions ] = useState()
    React.useEffect(()=>{ (async()=>{
        questions = await data._getQuestions();
        setquestions(questions);
        })();
    }, []);

    var answer = function(evt){
    
        var arr = evt.target.value.split('|');
        var qid = arr[0];
        var ans =arr[1];
        alert(qid + " and answer " + ans + " " + props.id);
        (async()=>{
        await data._saveQuestionAnswer(props.id, qid, ans)
        setquestions(await data._getQuestions());
        })();
        
    }
    
    return <div> 
        
        <h3>Answer some questions</h3>
        {questions && Object.keys(questions).filter(x=>questions[x].optionOne.votes.indexOf(props.id) < 0 && 
       questions[ x].optionTwo.votes.indexOf(props.id) < 0 ).map(x=>
            <div>
                Would you rather <input type='radio' onClick={answer} value={questions[x].id +"|optionOne"}/> {questions[x].optionOne.text} or 
                <input type='radio' onClick={answer} value={questions[x].id +"|optionTwo"}/> {questions[x].optionTwo.text} 
                </div>)


        }




    </div>
}

export default Myunanswered;