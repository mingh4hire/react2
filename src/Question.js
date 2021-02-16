import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import * as data from './_Data';
import { useSelector, useDispatch } from 'react-redux';

export function Question() {
    const { question_id } = useParams()
    var question
    const dispatch = useDispatch();
    const selector = useSelector(x => x);
    var setQuestion
    [question, setQuestion] = useState()

    React.useEffect(() => {
        (async () => {
            var questions = await data._getQuestions()
            var users = await data._getUsers()
            var user = Object.keys(users).filter(x => users[x].questions.indexOf(question_id) >= 0);
            user = users[user];
            setQuestion({ question: questions[question_id], user: user })
            dispatch({ type: 'questions', questions: questions })

        })()
    }, []);
    return <div>
        {selector && selector.questions &&
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
                        +selector.questions[question_id].optionTwo.votes.length >0
                        && Math.round((selector.questions[question_id].optionOne.votes.length *100/ (selector.questions[question_id].optionTwo.votes.length +
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
                    selector.questions[question_id].optionOne.votes.length>0
                        && Math.round((selector.questions[question_id].optionTwo.votes.length *100/ (selector.questions[question_id].optionTwo.votes.length +
                            selector.questions[question_id].optionOne.votes.length)))}% 

                            
                            </td></tr>
                        {selector.questions[question_id].optionTwo.votes.map(x => <tr>
                            <td>   {x} | {selector.users[x].name} |  <img src={selector.users[x].avatarURL} width={32} height={32} /></td>

                        </tr>)}
                        {selector.questions[question_id].optionTwo.votes.length == 0 && <tr><td>Nobody</td></tr>}
                    </tbody>
                </table>
            </div>


        }

    </div>
}

export default Question;