import {useState} from 'react';
import * as data from './_Data';
import React from 'react'
export function Newquestion(){
    var optionOne=""
    var optionTwo=""
    var setOptionOne
    var setOptionTwo
    [optionOne, setOptionOne] = useState("");
    [optionTwo, setOptionTwo] = useState("");

    React.useEffect(()=>{


    },[])
    function setOptionOne1(evt){
         setOptionOne(evt.target.value)
        
    }
    function setOptionTwo2(evt){
 
        setOptionTwo(evt.target.value);
    }
    function save(){
        // optionOneText, optionTwoText, author
        (async() => {
        await data._saveQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author: localStorage.getItem('user')})
            setOptionOne('');
            setOptionTwo('');
            alert('question added');
    
        })();
    
    }
    return <div>
        <h3>Create a new Question</h3>
<table style={{margin:"auto"}}>
    <tbody>
    <tr><td>
Option One:   <input value={optionOne}  onChange={setOptionOne1}/> <br/>
</td>
</tr>
<tr><td>
Option Two:   <input value={optionTwo}  onChange={setOptionTwo2}/> <br/>
</td></tr>
<tr>
    <td>
        <button onClick={save}>save</button>
    </td>
</tr>
</tbody>
</table>
    </div>
}

export default Newquestion;