import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const clickToBackHandler=()=>{
        navigate('/');
    }
    const [userField, setUserField] = useState({
        email: "",
        password:"",
    });
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value,
        });
        console.log(userField);
    }
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login`, userField);
            console.log(response.data);
            setError(response);
        } catch (err) {
            setError(err.response);
        }
    };
    return (
        <div className='row mb-3'>
        <div className='col-sm-10'>
            <h3>sgin in</h3>
            <form>
                <div className="col-sm-10">
                    {/* <label className="col-sm-2 col-form-label">Email:</label> */}
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                <div className="col-sm-10">
                    {/* <label className="col-sm-2 col-form-label">Password:</label> */}
                    <input type="text" className="form-control" id="password" placeholder="Enter password" name="password" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                 
                <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Login</button>
            </form>
            {error && (
                    <div className="alert alert-danger" role="alert">
                        {typeof error === "object" && error.errors ? (
                            <div>
                                {error.errors.email && <p>{error.errors.email}</p>}
                                {error.errors.password && <p>{error.errors.password}</p>}
                            </div>
                        ) : (
                            <p>{error.errors}</p>
                        )}
                    </div>
                )}

        </div>
        <div className='container d-flex justify-content-center'>
                <button className='btn btn-info' onClick={ clickToBackHandler}>Back To Home</button>
            </div>
    </div>
    
    );
}

export default login;