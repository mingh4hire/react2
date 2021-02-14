import * as data from './_Data';
import React from 'react';
import {useState} from 'react';
export function Leaderboard(){
    var Users;
    var setUsers;
    [Users, setUsers] = useState();
    React.useEffect(()=>{
    (async()=> {
                
                var Users = await data._getUsers();
                Users = Object.keys( Users).map(x=>Users[x]);
                Users.sort((x,y)=> x.questions.length + Object.keys(x.answers).length > 
                y.questions.length + Object.keys(y.answers).length ? -1 : 1)
                setUsers(Users);
                document.x = Users;
            })();
        }, []);
    return <div>

<h3>Leaderboard</h3>
<div>
<table className='center' style={{display:'fixed', margin:'auto'}}>
{ Users && (Users).map(x=>  <tr>
    <td><img src={x.avatarURL} style={{width:32, height:32}}/></td><td>
    {x.name }</td><td> {Object.keys(x.answers).length + x.questions.length} points &nbsp;</td>
  <td>  {Object.keys(x.answers).length} questions answered   &nbsp;<br/>
    {x.questions.length} questions asked <br/>
    </td>


</tr>)}</table>
</div>
    </div>

}

export default Leaderboard;