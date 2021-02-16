import React from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

export function Login(props){
    
    const statesel = useSelector(state=>state) 
    const loggedin = statesel && statesel.user;
    const dispatch = useDispatch( );
    function add(user){
      dispatch({type:'user', user:user})
      
    }
  
    function setcurrentuser(evt){
        
        props.setcurrentuser(evt.target.value)
        add(evt.target.value)
        localStorage.setItem("user",evt.target.value)
    }
    return <div> 
{props.currentuser}
{!props.currentuser  && ' Log in please '}<br/>

 
 <br/>
 {(loggedin && localStorage.getItem('user')) &&
 <Redirect
  to={{
    pathname: "/" 
   }}
/>}
    <select value={props.currentuser} value="" onChange={setcurrentuser }>
        <option selected >  </option>
            {props.users && Object.keys(props.users).map(x=> 

                 <option key={x} value={props.users[x].id}>
                        {props.users[x].name} | 
                    {props.users[x].id}
                </option>

            
            
         )}
    </select>

</div>


}

export default Login;