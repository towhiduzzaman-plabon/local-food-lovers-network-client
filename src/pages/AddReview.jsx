import { useForm } from 'react-hook-form';
import { api } from '../lib/axios';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

// AddReview page component
export default function AddReview(){
const { user } = useAuth();
const { register, handleSubmit, reset } = useForm();

// Handle form submission
const onSubmit = async (data) => {
try{
const res = await api.post('/reviews', { ...data, userName: user.displayName });
reset();
toast.success('Review added');
}catch(e){ toast.error(e?.response?.data?.message || 'Failed'); }
};


return (
<div className="container mx-auto px-3 max-w-2xl">
<h1 className="text-2xl font-semibold my-4">Add Review</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
<input className="input input-bordered w-full" placeholder="Food Name" {...register('foodName', { required: true })} />
<input className="input input-bordered w-full" placeholder="Food Image URL" {...register('foodImage', { required: true })} />
<input className="input input-bordered w-full" placeholder="Restaurant Name" {...register('restaurantName', { required: true })} />
<input className="input input-bordered w-full" placeholder="Location" {...register('location', { required: true })} />
<input type="number" step="0.1" min="0" max="5" className="input input-bordered w-full" placeholder="Star Rating (0-5)" {...register('rating', { required: true })} />
<textarea className="textarea textarea-bordered w-full" placeholder="Your honest review" {...register('reviewText', { required: true })} />
<button className="btn btn-primary">Submit</button>
</form>
</div>
);
}