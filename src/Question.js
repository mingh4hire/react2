import React from 'react';
import { useState } from 'react';
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'

import { useParams } from "react-router-dom";
import * as data from './_Data';
import { useSelector, useDispatch } from 'react-redux';
import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';

export function Question() {
    const { question_id } = useParams()
     const dispatch = useDispatch();
    const selector = useSelector(x => x);
     const vote = function(evt){
          var val = evt.target.value;

        //   (async()=>{
        //     await data._saveQuestionAnswer( { authedUser:selector.user,qid: question_id, answer:val })
        //    setquestions(await data._getQuestions());
        //    dispatch({type:'questions', questions:questions})
   
        //     })();
        (async()=>{
            // authedUser, qid, answer
            await data._saveQuestionAnswer({authedUser: selector.user, qid: question_id, answer: val})
            var questions = await data._getQuestions()
            var users = await data._getUsers()
            dispatch(QuestionsAction(questions)())
            dispatch(UsersAction(users)())

 

        })()
        
    }
    React.useEffect(() => {
        (async () => {
            var questions = await data._getQuestions()
            var users = await data._getUsers()
            var user = Object.keys(users).filter(x => users[x].questions.indexOf(question_id) >= 0);
            user = users[user];
            dispatch(QuestionsAction(questions)())
            dispatch(UsersAction(users)())

        })()
    }, []);
    return <div>
        {selector && selector.questions && selector.users &&
            <div>
                <table style={{ margin: "auto" }} className='center'>
                    <tbody>
                        <tr>
                            <td><img src={selector.users[selector.user].avatarURL} style={{ width: 32, height: 32 }} /></td>

                            <td>{selector.users[selector.user].name} created this question</td>
                            <td>
                                Would you rather ...
                   {selector.questions[question_id].optionOne.text} or
                  <br />
                                {selector.questions[question_id].optionTwo.text} ?

                  <br />
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>


                    </tbody>


                </table>
                <table className='center' className='questionvotes' style={{ margin: "auto", width: 333, display: 'block' }}>
                    <tbody>
                        <tr><td>Votes for option one ({selector.questions[question_id].optionOne.votes.length} ) {selector.questions[question_id].optionOne.votes.length
                            + selector.questions[question_id].optionTwo.votes.length > 0
                            && Math.round((selector.questions[question_id].optionOne.votes.length * 100 / (selector.questions[question_id].optionTwo.votes.length +
                                selector.questions[question_id].optionOne.votes.length)))}%

                        </td></tr>
                        {selector.questions[question_id].optionOne.votes.map(x => <tr>
                            <td>   {x} | {selector.users[x].name} |  <img src={selector.users[x].avatarURL} width={32} height={32} /></td>

                        </tr>)}
                        {selector.questions[question_id].optionOne.votes.length == 0 && <tr><td>Nobody</td></tr>}

                    </tbody>
                </table>


                <table className='center' className='questionvotes' style={{ margin: "auto", width: 200, display: 'block' }}>

                    <tbody>
                        <tr><td>Votes for option two ({selector.questions[question_id].optionTwo.votes.length} ) {selector.questions[question_id].optionTwo.votes.length +
                            selector.questions[question_id].optionOne.votes.length > 0
                            && Math.round((selector.questions[question_id].optionTwo.votes.length * 100 / (selector.questions[question_id].optionTwo.votes.length +
                                selector.questions[question_id].optionOne.votes.length)))}%


                            </td></tr>
                        {selector.questions[question_id].optionTwo.votes.map(x => <tr>
                            <td>   {x} | {selector.users[x].name} |  <img src={selector.users[x].avatarURL} width={32} height={32} /></td>

                        </tr>)}
                        {selector.questions && selector.questions[question_id].optionTwo.votes.length == 0 && <tr><td>Nobody</td></tr>}
                    </tbody>
                </table>
                <br />
                {selector.users && !selector.users[selector.user].answers[question_id]  &&
                    <div>
                        <h3>Vote</h3>
                        Vote for option one <input value='optionOne' type='radio' onClick={vote} />
                        Vote for option two <input value='optionTwo' type='radio' onClick={vote} />

                    </div>}
                    {selector.users && selector.users[selector.user].answers[question_id]    &&
                    <div>
                        <h3>You already voted for {selector.users[selector.user].answers[question_id]}   </h3>

                    </div>}
                    <br/>      <Link to="/">Go back</Link>

             </div>
            
        }
        </div>
}

export default Question;