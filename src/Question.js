import React from 'react';
import {useState} from 'react';
import {useParams} from "react-router-dom";
import * as data from './_Data';
export function Question(){
    const {question_id} = useParams()
    var question
    var setQuestion
       [question, setQuestion] = useState()
    React.useEffect(()=>{
    (async() => {
        var questions = await data._getQuestions()
        var users = await data._getUsers()
        var user = Object.keys(users).filter(x=> users[x].questions.indexOf(question_id) >= 0);
        user = users[user];
        setQuestion({question: questions[question_id] , user: user})
    })()
},[]);
    return <div>
        {question && 
        <div>
          <table style={{margin:"auto" }}  className='center'>
              <tbody> 
              <tr>
              <td>{question.user.name } created this question</td>
              <td><img src={question.user.avatarURL}  style={{width:32, height:32}} /></td>
              <td>
                  Would you rather ... 
                   {question.question.optionOne.text} or 
                  <br/>
                  {question.question.optionTwo.text} 

                  <br/>
              </td>
              </tr>
              <tr><td>&nbsp;</td></tr>

           
              </tbody>         
              
              
                   </table>
 <table className='center' className='questionvotes' style={{margin:"auto", width:200, display:'block'}}>
     <tbody> 
 <tr><td>Votes for option one</td></tr>
 {question.question.optionOne.votes.map(x=><tr>
<td>   {x}  </td>

</tr>) }
{question.question.optionOne.votes.length == 0 && <tr><td>Nobody</td></tr>}

</tbody>
</table>


<table className='center' className='questionvotes' style={{margin:"auto", width:200, display:'block'}}>

    <tbody>
<tr><td>Votes for option two</td></tr>
{question.question.optionTwo.votes.map(x=><tr> 
<td>   {x}  </td>

</tr>) }
{question.question.optionTwo.votes.length == 0 && <tr><td>Nobody</td></tr>}
</tbody>
</table>
    </div>

              
}

    </div>
}

export default Question;