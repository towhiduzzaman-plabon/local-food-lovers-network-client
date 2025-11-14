import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login(){
  const { register: reg, handleSubmit } = useForm();
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const onSubmit = async ({email, password}) => {
    try{
      await login(email, password);
      nav(loc.state?.from?.pathname || '/');
    }catch(e){
      toast.error(e.message);
    }
  };

  const handleGoogle = async () => {
    try{
      await loginWithGoogle();
      nav('/');
    }catch(e){
      toast.error(e.message);
    }
  };

  return (
    <div className="container mx-auto px-3 max-w-md">
      <h1 className="text-2xl font-semibold my-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          {...reg('email', { required: true })}
        />
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          {...reg('password', { required: true })}
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>

      {/* Google button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="btn bg-white text-black border-[#e5e5e5] w-full mt-3"
        aria-label="Login with Google"
      >
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-2">
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        Login with Google
      </button>

      <p className="mt-3">
        New here? <Link to="/register" className="link">Create an account</Link>
      </p>
    </div>
  );
}
