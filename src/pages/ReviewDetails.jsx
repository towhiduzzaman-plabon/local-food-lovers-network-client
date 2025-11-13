import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import RatingStars from '../components/RatingStars';
import { toast } from 'react-hot-toast';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop';

export default function ReviewDetails(){
  const { id } = useParams();
  const nav = useNavigate();

  const { data } = useQuery({
    queryKey:['review', id],
    queryFn: async()=> (await api.get(`/reviews/${id}`)).data
  });

  if(!data) return null;

  const rating = Number(data?.rating ?? data?.starRating ?? 0);
  const imgSrc = data?.foodImage || FALLBACK_IMG;

  const handleBuy = async () => {
    try{
      // ✅ _id যেভাবেই আসুক (string / {$oid: ...}), সব কেসে string বানিয়ে পাঠাচ্ছি
      const rid = (data?._id?.$oid ?? data?._id ?? '').toString();
      await api.post('/purchases', { reviewId: rid });
      toast.success('Purchase completed!');
      nav('/purchases');
    }catch(e){
      toast.error(e?.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div className="container mx-auto px-3 grid md:grid-cols-2 gap-6 mt-6">
      <img
        className="w-full h-80 object-cover rounded"
        src={imgSrc}
        alt={data.foodName}
        onError={(e)=>{ e.currentTarget.src = FALLBACK_IMG; }}
      />

      <div>
        <h1 className="text-3xl font-bold mb-2">{data.foodName}</h1>
        <p className="mb-2">{data.restaurantName} • {data.location}</p>

        <div className="mb-4 flex items-center gap-2">
          <RatingStars value={rating}/>
          <span>{rating.toFixed(1)}</span>
        </div>

        <p>{data.reviewText}</p>

        {/* ✅ Only Buy Now */}
        <div className="mt-5 flex items-center gap-3">
          <button onClick={handleBuy} className="btn btn-accent">Buy Now</button>
          <Link to="/reviews" className="btn btn-ghost border">← Back</Link>
        </div>
      </div>
    </div>
  );
}
