import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="right-section">
      {user ? (
            <button className='button' onClick={onLogout}>
               Logout
            </button>
        ) : (
          <>
              <Link className='button' to='/login'>
                 Login
              </Link>
              <Link className='button' to='/register'>
                 Register
              </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
