import React from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UserAction from './UserAction';
import QuestionsAction from './QuestionsAction';
import UsersAction from './UsersAction';
import * as data from './_Data';
export function Login(props) {

    const user= useSelector(x=>x.user);
    const users= useSelector(x=>x.users);
     const dispatch = useDispatch();
 
    function add(user) {
        dispatch(UserAction(user)())

    }

    function setcurrentuser(evt) {

        add(evt.target.value)
    }
    return <div>
         <br />
         <br />
         Select a user
          {user && <Redirect
                to={{
                    pathname: "/"
                }}
            />}  
         
           {   users && Object.keys(users) &&
        <select onChange = {setcurrentuser}>
            <option selected></option>
                {users && Object.keys(users).map(x=>
                    <option key={x} value={x}>
                            {users[x].id } | {users[x].name }

                    </option>
                    
                    )}

        </select>
}
           
    </div>


}

export default Login;