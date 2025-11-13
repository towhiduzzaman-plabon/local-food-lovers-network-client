import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


export default function EditReview(){
const { id } = useParams();
const nav = useNavigate();
const { data } = useQuery({ queryKey:['review', id], queryFn: async()=> (await api.get(`/reviews/${id}`)).data });
const { register, handleSubmit, reset } = useForm({ values: data });


const onSubmit = async (form) => {
try{
await api.put(`/reviews/${id}`, form);
toast.success('Updated');
nav('/my-reviews');
}catch(e){ toast.error(e?.response?.data?.message || 'Failed'); }
};
if(!data) return null;
return (
<div className="container mx-auto px-3 max-w-2xl">
<h1 className="text-2xl font-semibold my-4">Edit Review</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
<input className="input input-bordered w-full" placeholder="Food Name" {...register('foodName')} />
<input className="input input-bordered w-full" placeholder="Food Image URL" {...register('foodImage')} />
<input className="input input-bordered w-full" placeholder="Restaurant Name" {...register('restaurantName')} />
<input className="input input-bordered w-full" placeholder="Location" {...register('location')} />
<input type="number" step="0.1" min="0" max="5" className="input input-bordered w-full" placeholder="Star Rating (0-5)" {...register('rating')} />
<textarea className="textarea textarea-bordered w-full" placeholder="Your honest review" {...register('reviewText')} />
<button className="btn btn-primary">Save</button>
</form>
</div>
);
}