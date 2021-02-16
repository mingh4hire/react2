import * as data from './_Data';
import {useState} from 'react';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

export function Myunanswered(){
    var user =localStorage.getItem('user');
    const dispatch = useDispatch();
    const selector = useSelector(x=>x);
    var setquestions
    
    var questions
       [questions, setquestions ] = useState()
    var effect = React.useEffect(()=>{ (async()=>{
        questions = await data._getQuestions();
        setquestions(questions);
        dispatch({type:'questions', questions:questions})

        })();
    }, []);

    var answer = function(evt){
    
        var arr = evt.target.value.split('|');
        var qid = arr[0];
        var ans =arr[1];
         (async()=>{
          await data._saveQuestionAnswer( { authedUser:selector.user,qid: qid, answer:ans });
         var questions = await data._getQuestions()
        dispatch({type:'questions', questions:questions})

         })();
        
    }
    
    return <div> 
        
        <h3>Answer some questions</h3>
        {selector && selector.questions && Object.keys(selector.questions).filter(x=>selector.questions[x].optionOne.votes.indexOf(selector.user) < 0 && 
       selector.questions[ x].optionTwo.votes.indexOf(selector.user) < 0 ).map(x=>
            <div key={selector.questions[x].id}>
                Would you rather <input type='radio' name={selector.questions[x].id} key='option1' onClick={answer} value={selector.questions[x].id +"|optionOne"}/>
                 {selector.questions[x].optionOne.text} or 
                <input type='radio' onClick={answer} name={selector.questions[x].id} key='option2' value={selector.questions[x].id +"|optionTwo"}/>
                 {selector.questions[x].optionTwo.text} 
                </div>)


        }




    </div>
}

export default Myunanswered;