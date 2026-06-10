import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from './register/register';
import Login from './login/login';
import GameAndChat from './GameAndChat/GameAndChat';

function Joined() {
  return (
    <Router>
      <div className="App-style">
        <Routes>
          <Route path="/" element={<GameAndChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Joined
