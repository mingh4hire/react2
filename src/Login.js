import React from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom'
export function Login(props){
    function setcurrentuser(evt){

        props.setcurrentuser(evt.target.value)
        localStorage.setItem("user",evt.target.value)
    }
    return <div> 
{props.currentuser}
{!props.currentuser  && ' Log in please '}<br/>

 
 <br/>
 {props.currentuser &&
 <Redirect
  to={{
    pathname: "/",
     state: { referrer: 23 }
  }}
/>}
    <select value={props.currentuser} onChange={setcurrentuser }>
        <option  >  </option>
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