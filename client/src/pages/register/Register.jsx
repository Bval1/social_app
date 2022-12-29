import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss"
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault(); // to prevent refreshing of page

    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    }catch(err){
      setError(err.response.data);
      //console.log(err.response.data);
    }
    
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Media App</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Ipsam eum impedit quaerat doloribus id eligendi magnam eos veritatis earum et. 
            Cumque tempora doloremque consequuntur magni, omnis facilis optio eum. Et.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            
            { err && err }
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;