import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../App';

export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        if(loggedInUser) {
            navigate('/');
        }
    }, [loggedInUser]);

    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/register',
            user);
            setLoading(false);
            if(!response.data.error) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/login');
            }else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <div className="row my-5 mb-5">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="text-cenret mt-2">
                                Register
                            </h5>
                        </div>
                        <div className="card-body">
                            <form className='mt-5' onSubmit={(e) => registerUser(e)}>
                                <div className="mb-3">
                                    <label htmlFor="name" 
                                        className='form-label'>Name*</label>
                                    <input type="text" id="name" 
                                        onChange={(e) => setUser({
                                            ...user, name: e.target.value
                                        })}
                                        required
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" 
                                        className='form-label'>Email*</label>
                                    <input type="email" id="email" 
                                        onChange={(e) => setUser({
                                            ...user, email: e.target.value
                                        })}
                                        required
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" 
                                        className='form-label'>Password*</label>
                                    <input type="password" id="password" 
                                        onChange={(e) => setUser({
                                            ...user, password: e.target.value
                                        })}
                                        required
                                        minLength={8}
                                        className="form-control" />
                                </div>
                                <div className="mb-3">
                                    {
                                        loading ? 
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        : 
                                        <button type="submit" 
                                            className='btn btn-primary'>
                                                Submit
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}