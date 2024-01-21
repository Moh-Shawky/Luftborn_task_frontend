import React, {useState,useEffect} from "react";
import { NavLink,useNavigate } from 'react-router-dom';
import axios from "axios";


const Home = () => {
    const [userData, setUSerData] = useState([]);
    const navigate = useNavigate();
    const clickToLogin=()=>{
        navigate('/login');
    }
    const clickToregister=()=>{
        navigate('/register');
    }
    useEffect(() => {
       fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/users");
            console.log(result.data);
            setUSerData(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete=async(id)=>{
        await axios.delete("http://127.0.0.1:8000/api/users/"+id);
        const newUserData=userData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setUSerData(newUserData);
    }
    const sendEmails = async()=>{
        try {
            const response = await axios("http://127.0.0.1:8000/api/send-mails");
            console.log(response);
            <div className="alert alert-danger" role="alert">
                    <p>{response.data.message}</p>
            </div>
        }
        catch (err){
            console.log(err);
        }
    }

    return ( 
        <div>
          <div className="row">
            <div className="col-md-12">
              <h1>Users Details</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                    userData.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.firstname} {user.lastname} </td>
                                <td>{user.email} </td>
                                <td>{user.role ? 'Manager' : 'Reciption'}</td>


                                <td>
                                    <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                    <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
 
            </tbody>
              </table>
            </div>
          </div>
          <div className='container d-flex justify-content-center'>
          <button onClick={()=>sendEmails()} className="btn btn-warning">Send emails for all users</button>
          </div><br/>
            <div className='container d-flex justify-content-center'>
                If you aleardy have account 
                <button className='btn btn-primary' onClick={ clickToLogin}>Login</button>
            </div><br/>
            <div className='container d-flex justify-content-center'>
                or create new account 
                <button className='btn btn-success' onClick={ clickToregister}>Sgin UP</button>
            </div>
        </div>
    );
};
export default Home;
