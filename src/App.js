import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import {useState} from 'react'
import {Router , Route} from 'react-router-dom';
function App() {
  var ccc = '23423'
  var u = [1,2,3,45]
  var users = null
 const  [us, setusers ] = useState()
   var a  = (async()=>{
     users = await data._getUsers();
     document.x = users;
     setusers(users);

    //  alert('users is ' + JSON.stringify(Object.keys(users)));
  })();
  return (
    <div className="App">
      { us && Object.keys(us)} <hr/>
      {/* us is {Object.keys(us)} */}
users is {users} and users keys is {users && Object.keys(users)}
      {Object.keys(u).map(x=><div key={x}> {u[x]}</div>)}<hr/>
      {1 + 2342 + 'asdf' + ccc}
    {users && Object.keys(users)} are the keys
    <hr/>
{users &&  Object.keys(users).map(x=> 
          <div>
          1
         { users[x].id  }    { users[x].name  }        
             
</div>)}

      <select>
        {users && Object.keys(users).map(x=> 
          
          
          <option key={x} value={ users[x].id  }>   { users[x].name  }        
            </option>
            
            )
}
</select>


       
     </div>
  );
}

export default App;
