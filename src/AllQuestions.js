import {useState} from 'react';
import * as data from './_Data';
import  Login from './Login';
import React from 'react'
import {Redirect, BrowserRouter as Router, Route, Link} from 'react-router-dom'
import * as data from './_Data';
export function AllQuestions(){
    var [questions, setQuestions] =useState()
    React.useEffect(()=>{
        (async()=>{
           var q =  await data._getQuestions();
            setQuestions(q);

        })();

    },[])
  
    return <div>

        
    </div>
}

export default AllQuestions;