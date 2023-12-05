import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Properties from './components/Properties'
import Dashboard from './components/Dashboard'
import UpdateProperty from './components/UpdateProperty'


const App = () => {
  return (
    <>
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={
        <>
        <Navbar/>
        <Properties/>
        </>
        } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={
        <>
        <Navbar/>
        <Dashboard/>
        </>
        } />
        <Route path='/edit' element={<UpdateProperty/>}/>
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
    
  )
}

export default App
