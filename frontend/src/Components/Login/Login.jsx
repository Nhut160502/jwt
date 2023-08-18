import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/apiRequest";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [values, setValues] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        loginUser(values, dispatch, navigate)
    }


    return ( 
        <>
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>USERNAME</label>
                <input name="email" type="text" placeholder="Enter your username" onChange={(e) => setValues({...values, [e.target.name]:e.target.value})}/>
                <label>PASSWORD</label>
                <input name="password" type="password" placeholder="Enter your password" onChange={(e) =>setValues({...values, [e.target.name]:e.target.value})}/>
                <button type="submit"> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
        <ToastContainer/>
        </>
     );
}
 
export default Login;