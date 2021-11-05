import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './features/authSlice';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn)

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/sign-in');
  }

  return (
    <div className="App text-center">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>MyApp.com</Link>
          {!loggedIn && (
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          )}
          {loggedIn && (
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <button className="btn nav-link" onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;