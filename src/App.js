import React from 'react';
import './App.css';

import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';
import Edit from './components/edit';


import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/edit/:id" element={<Edit/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
