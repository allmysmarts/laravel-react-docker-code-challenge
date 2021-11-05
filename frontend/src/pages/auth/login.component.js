import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice'

import './auth.css';

import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const submit = () => {
        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://api.myapp.com/api/login', formData)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(login())
                navigate('/dashboard');
            })
            .catch((error) => {
                setValidation(error.response.data);
            })
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>
                    {validation.message && (
                        <div className="alert alert-danger">
                            {validation.message}
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {validation.email && (
                        <div className="alert alert-danger mt-1">
                            {validation.email[0]}
                        </div>
                    )}
                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {validation.password && (
                        <div className="alert alert-danger mt-1">
                            {validation.password[0]}
                        </div>
                    )}

                    <button type="button" className="btn btn-primary btn-block mt-3" onClick={submit}>Login</button>
                </form>
            </div>
        </div> 
    );
}