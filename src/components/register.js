import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const register = () => {

    const navigate = useNavigate();
    const clickToLogin=()=>{
        navigate('/login');
    }
    const clickToBackHandler=()=>{
        navigate('/');
    }
 
    const [userField, setUserField] = useState({
        firstname: "",
        lastname:"",
        // role:"",
        email: "",
        password:"",
        password_confirmation:""
    });
    const [error, setError] = useState(null);
 


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
          const response = await axios.post(`http://127.0.0.1:8000/api/users`, userField);
          console.log(response.data);
          navigate('/login');
        } catch (err) {
          if (err.response && err.response.data && err.response.data.errors) {
            // Check if errors is truthy before accessing its properties
            console.log(err.response.data.errors);
            const errorMessages = Object.values(err.response.data.errors).flat();
            setError(errorMessages);
          } else {
            // Handle unexpected error format or log the entire error object
            console.error('Unexpected error format:', err);
            // You can decide how to handle unexpected errors, e.g., show a generic message
            setError(['An unexpected error occurred. Please try again.']);
          }
        }
      };
      
 
    return (
        <div className='row mb-3'>
        <div className='col-sm-10'>
            <h3>sgin in</h3>
            <form>
            <div className="col-sm-10">
                    <label className="col-sm-2 col-form-label">First name:</label>
                    <input type="text" className="form-control" id="fname" placeholder="Enter First name" name="firstname" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                <div className="col-sm-10">
                    <label className="col-sm-2 col-form-label">Last name:</label>
                    <input type="text" className="form-control" id="lname" placeholder="Enter Last name" name="lastname" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                <div className="col-sm-10">
                    <label className="col-sm-2 col-form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                <div className="col-sm-10">
                    <label className="col-sm-2 col-form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                <div className="col-sm-10">
                    <label className="col-sm-2 col-form-label">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Repeat password" name="password_confirmation" onChange={e => changeUserFieldHandler(e)} required/>
                </div><br/>
                {/* <input type="hidden" className="form-control" id="password" placeholder="Enter password" name="role" value={0} onChange={e => changeUserFieldHandler(e)} required/> */}

                 
                <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Sgin Up</button>
            </form><br/>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error.map((errorMessage, index) => (
                    <p key={index}>{errorMessage}</p>
                ))}
            </div>
            )}
            <div className='container d-flex justify-content-center'>
                If you aleardy have account 
                <button className='btn btn-primary' onClick={ clickToLogin}>Login</button>
            </div><br/>
        </div><br/>
        <div className='container d-flex justify-content-center'>
                <button className='btn btn-info' onClick={ clickToBackHandler}>Back To Home</button>
            </div>
    </div>
    );
}

export default register;