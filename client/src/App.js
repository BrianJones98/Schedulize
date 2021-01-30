//Dependency imports
import './App.css';
import {Router} from '@reach/router';

//View imports
import Index from './views/Index.jsx';
import Dashboard from './views/Dashboard.jsx';

function App() {
  
  return (
    <div className="App">
      <header>
        <h1>Schedulize</h1>
      </header>
      <Router>
        <Index path="/"/>
        <Dashboard path="/dashboard"/>
      </Router>
    </div>
  );
}

export default App;