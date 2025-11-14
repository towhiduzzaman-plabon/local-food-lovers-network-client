import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Registration page component
export default function Register(){
const { register, handleSubmit } = useForm();
const { register: registerUser } = useAuth();
const nav = useNavigate();


const onSubmit = async ({name, email, photoURL, password, confirm}) => {
const valid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
if (!valid.test(password)) return toast.error('Password must have uppercase, lowercase, and be ≥ 6 chars');
if (password !== confirm) return toast.error('Passwords do not match');
try{ await registerUser({ name, email, password, photoURL }); nav('/'); }
catch(e){ toast.error(e.message); }
};


return (
<div className="container mx-auto px-3 max-w-md">
<h1 className="text-2xl font-semibold my-4">Register</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
<input className="input input-bordered w-full" placeholder="Name" {...register('name', { required: true })} />
<input className="input input-bordered w-full" placeholder="Photo URL" {...register('photoURL')} />
<input className="input input-bordered w-full" placeholder="Email" {...register('email', { required: true })} />
<input type="password" className="input input-bordered w-full" placeholder="Password" {...register('password', { required: true })} />
<input type="password" className="input input-bordered w-full" placeholder="Confirm Password" {...register('confirm', { required: true })} />
<button className="btn btn-primary w-full">Create Account</button>
</form>
</div>
);
}