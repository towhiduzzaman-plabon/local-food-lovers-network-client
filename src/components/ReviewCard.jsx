import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { api } from '../lib/axios';
import { toast } from 'react-hot-toast';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop';

export default function ReviewCard({ review }){
  const rating = Number(review?.rating ?? review?.starRating ?? 0);
  const imgSrc = review?.foodImage || FALLBACK_IMG;

  const addFav = async () => {
    try{
      await api.post('/favorites', {
        reviewId: review._id,
        foodName: review.foodName,
        restaurantName: review.restaurantName,
        foodImage: review.foodImage // DB-তে আসলটা রাখছি
      });
      toast.success('Added to favorites');
    }catch(e){
      toast.error(e?.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="card bg-base-100 shadow">
      <figure className="h-48">
        <img
          className="w-full h-full object-cover"
          src={imgSrc}
          alt={review.foodName}
          onError={(e)=>{ e.currentTarget.src = FALLBACK_IMG; }}
          loading="lazy"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title">{review.foodName}</h3>
        <p className="text-sm">{review.restaurantName} • {review.location}</p>

        <div className="flex items-center gap-2">
          <RatingStars value={rating} />
          <span>{rating.toFixed(1)}</span>
        </div>

        <div className="card-actions justify-between">
          <Link className="btn btn-primary" to={`/reviews/${review._id}`}>View Details</Link>
          <button className="btn btn-outline btn-error" onClick={addFav}>❤ Favorite</button>
        </div>
      </div>
    </div>
  );
}
