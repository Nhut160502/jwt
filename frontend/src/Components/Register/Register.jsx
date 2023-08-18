import { useState } from "react";
import "./register.css";
import { registerUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [values, setValues] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmiit = (e) =>{
        e.preventDefault()
        registerUser(values, dispatch, navigate)
    }

    return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form onSubmit={handleSubmiit}>
                <label>EMAIL</label>
                <input name="email" type="text" placeholder="Enter your email" onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} />
                <label>USERNAME</label>
                <input name="name" type="text" placeholder="Enter your username" onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} />
                <label>PASSWORD</label>
                <input name="password" type="password" placeholder="Enter your password" onChange={(e) => setValues({...values, [e.target.name]:e.target.value})} />
                <button type="submit"> Create account </button>
            </form>
        </section>
        
     );
}
 
export default Register;