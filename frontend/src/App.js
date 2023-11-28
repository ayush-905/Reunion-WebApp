import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<Navbar/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
