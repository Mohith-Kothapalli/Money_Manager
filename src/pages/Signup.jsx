import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {assets} from "../assets/assets"
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import { uploadProfileImage } from '../utils/uploadProfileImage';


const Signup=()=>{

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); 

  const navigate = useNavigate();

  const handleSubmit=async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    setIsLoading(true);
    if(!fullName.trim()){
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }
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

   //signup api call
    try {
        //upload image if present
        if(profilePhoto){
            const imageURL= await uploadProfileImage(profilePhoto);
            profileImageUrl = imageURL||"";
            
        }


        const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
            fullName,
            email,
            password,
            profileImageUrl
        })
        if(response.status === 201){
            toast.success("Sign up successful! Please log in.");
            navigate("/login");
        }
    }catch(err){
      console.error("Something went wrong during sign up.", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
  }
};
  
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
          Create an Account
        </h3>

        <p className="text-sm text-slate-700 text-center mb-8">
          Start tracking your spendings by joining with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
            </div>
           <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Full Name"
              label="Full Name"
              type="text"
              />

               <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              label="Email Address"
              type="email"
              />

              <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                label="Password"
                type="password"
              />
              </div>
              
           </div>
            {error && (<p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>)}

            <button disabled={isLoading} type='submit' className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ""}`}>
              {isLoading ? (
                <>
                  <LoaderCircle className='animate-spin w-5 h-5'/>
                  Signing Up...
                </>
              ):("Sign Up")}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?
              <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                Log in
              </Link>
            </p>
        </form> 

      </div>
    </div>

  </div>
);
}

export default Signup; 