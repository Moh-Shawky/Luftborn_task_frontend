import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';
 
const Edit = () => {
    const {id}=useParams()
    const navigate = useNavigate();
    const clickToBackHandler=()=>{
        navigate('/');
    }
 
    const [userField, setUserField] = useState({
        firstname: "",
        lastname:"",
        role:"",
        email: ""
    });
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetchUser();
    },[id])
 
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:8000/api/users/"+id);
            // console.log(result.data.users);
            setUserField(result.data)
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    // const changeUserFieldHandler = (e) => {
    //     setUserField({
    //         ...userField,
    //         [e.target.firstname]: e.target.value,
    //         [e.target.lastname]: e.target.value,
    //         [e.target.email]: e.target.value,
    //         [e.target.role]: e.target.value,
    //     });
    //     console.log(userField);
    // }

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
          const response = await axios.put(`http://127.0.0.1:8000/api/users/${id}`, userField);
          console.log(response.data);
          navigate('/');
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
 
    return(
        <div className='row'>
            <h1>Edit User</h1>
            <br/><br/><br/><br/><br/>
            <form onSubmit={e => onSubmitChange(e)}>
                <div className="mb-">
                    <label className="form-label"> First Name:</label>
                    <input type="text" className="form-control" placeholder="Edit Your First Name" name="firstname" value={userField.firstname} onChange={e => changeUserFieldHandler(e)} />
                </div><br/>
                <div className="mb-3 mt-3">
                    <label className="form-label"> Last Name:</label>
                    <input type="text" className="form-control" placeholder="Edit Your Last Name" name="lastname" value={userField.lastname} onChange={e => changeUserFieldHandler(e)} />
                </div><br/>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Edit your email" name="email" value={userField.email}  onChange={e => changeUserFieldHandler(e)}/>
                </div><br/>
                <div className="mb-3 mt-3">
                    <label className="form-label">Role:</label>
                    <select name='role' value={userField.role} onChange={e => changeUserFieldHandler(e)}>
                        <option value="0">Reception</option>
                        <option value="1">Manager</option>
                    </select>
                </div><br/>
                
                <button type="submit" className="btn btn-primary">Update</button>

            </form>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error.map((errorMessage, index) => (
                    <p key={index}>{errorMessage}</p>
                ))}
            </div>
            )}
            <div className='container d-flex justify-content-center'>
                <button className='btn btn-info' onClick={ clickToBackHandler}>Back To Home</button>
            </div>
            </div>
    );
};
 
export default Edit;
