import logo from './logo.svg';
import './App.css';
import * as data from './_Data.js';
import {Router , Route} from 'react-router-dom';
function App() {
  var ccc = '23423'
  var users = null
   var a  = (async()=>{
     users = await data._getUsers();
    //  alert('users is ' + JSON.stringify(Object.keys(users)));
  })();
  return (
    <div className="App">
      {1 + 2342 + 'asdf' + ccc}
    {users && Object.keys(users)} are the keys
    <hr/>
{users &&  Object.keys(users).map(x=> 
          <div>
          
         { users[x].id  }    { users[x].name  }        
             
</div>)}

      <select>
        {users && Object.keys(users).map(x=> 
          
          
          <option value={ users[x].id  }>   { users[x].name  }        
            </option>
            
            )
}
</select>


       
     </div>
  );
}

export default App;
