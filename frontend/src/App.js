import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<Navbar/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
    
  );
}

export default App;
