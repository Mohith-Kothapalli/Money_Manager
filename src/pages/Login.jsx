import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {assets} from "../assets/assets.js";
import Input from '../components/Input.jsx';
import { Link } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/apiEndpoints.js';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';


const Login=()=>{
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

  
    const navigate = useNavigate();
    const handleSubmit=async (e) => {
      e.preventDefault();
      setIsLoading(true);
    if(!email.trim()){
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }
    if(!password.trim()){
      setError('Please enter a password');
      setIsLoading(false);
      return;
    }
    setError("");
     //login api call
      try{
          const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
              email,
              password,
          });
          const {token,user}=response.data;
          if(token){
              localStorage.setItem("token", token);
              setUser(user);
              navigate("/dashboard");
          }
      }catch(err){
        if(err.response && err.response.data && err.response.data.message){
          setError(err.response.data.message);
        } else {
          console.error("Something went wrong during login.", err);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">

    {/* Background */}
    <img
      src={assets.logo_bg}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover blur-sm"
    />

    {/* Centered Card */}
    <div className="relative z-10 w-full max-w-lg px-6">
      <div className="bg-white backdrop-blur-sm rounded-lg max-h-[90vh] shadow-2xl p-8 text-center">

        <h3 className="text-2xl font-semibold text-center text-black mb-2">
          Welcome Back
        </h3>

        <p className="text-sm text-slate-700 text-center mb-8">
          Please enter your login details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          

               <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              label="Email Address"
              type="email"
              />

           
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                label="Password"
                type="password"
              />
          
  
            {error && (<p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>)}

            <button disabled={isLoading} type='submit' className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ""}`}>
              {isLoading ? (
                <>
                  <LoaderCircle className='animate-spin w-5 h-5'/>
                  Logging In...
                </>
              ):("Login")}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                Sign up
              </Link>
            </p>
        </form> 

      </div>
    </div>

  </div>
  )
}

export default Login;