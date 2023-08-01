import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../App';

export default function Header() {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const logout = async () => {
        const config = {
            headers: {
                "X-API-KEY": `${loggedInUser.api_key}`
            }
        }    
        try {
            const response = await axios.post('http://localhost:8000/logout', 
                {user_id: loggedInUser.id}, config);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.removeItem('user');
            setLoggedInUser(null);
            navigate('/login');
        } catch (error) {
            toast.error('Something went wrong try again later', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Events App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" 
                                to="/">Home</Link>
                        </li>
                        {
                            loggedInUser ? 
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">
                                        { loggedInUser.name }
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#"
                                        onClick={() => logout()}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                            : 
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
