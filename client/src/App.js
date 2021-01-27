//Dependency imports
import './App.css';
import {Router, navigate} from '@reach/router';
import axios from 'axios';

//View imports
import Index from './views/Index.jsx';
import Dashboard from './views/Dashboard.jsx';

function App() {
  // axios.interceptors.response.use(response => response, 
  //   error => {
  //   navigate("/");
  //   return error;
  // });
  
  return (
    <div className="App">
      <header>
        <h1>Schedulize</h1>
      </header>
      <hr/>
      <Router>
        <Index path="/"/>
        <Dashboard path="/dashboard"/>
      </Router>
    </div>
  );
}

export default App;