import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './auth.css';

import axios from "axios";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const submit = () => {
        const formData = new FormData();


        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        axios.post('http://api.myapp.com/api/register', formData)
            .then(() => {
                navigate('/sign-in');
            })
            .catch((error) => {
                setValidation(error.response.data);
            })
    }
    
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Full name</label>
                        <input type="text" className="form-control" name="name" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {validation.name && (
                        <div className="alert alert-danger mt-1">
                            {validation.name[0]}
                        </div>
                    )}
                    <div className="form-group mt-2">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {validation.email && (
                        <div className="alert alert-danger mt-1">
                            {validation.email[0]}
                        </div>
                    )}
                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {validation.password && (
                        <div className="alert alert-danger mt-1">
                            {validation.password[0]}
                        </div>
                    )}
                    <div className="form-group mt-2">
                        <label>Password Confirmation</label>
                        <input type="password" className="form-control" name="passwordConfirmation" placeholder="Password confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </div>

                    <button type="button" className="btn btn-primary btn-block mt-2" onClick={submit}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}