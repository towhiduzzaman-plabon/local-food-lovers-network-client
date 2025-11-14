import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Fallback image URL
const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop';

export default function Purchases(){
  const { data, isLoading, refetch } = useQuery({
    queryKey:['purchases'],
    queryFn: async()=> (await api.get('/purchases/mine')).data
  });

  const cancelPurchase = async (id) => {
    const ok = window.confirm('Cancel this purchase?');
    if (!ok) return;
    try {
      await api.delete(`/purchases/${id}`);
      toast.success('Purchase cancelled');
      refetch();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Cancel failed');
    }
  };

  if (isLoading) return <div className="container mx-auto px-3 py-6">Loading...</div>;

  return (
    <div className="container mx-auto px-3 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Purchases</h1>
        <Link to="/reviews" className="btn btn-outline btn-sm">Browse More</Link>
      </div>

      {!data?.length && <p className="opacity-70">No purchases yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map(p => (
          <div key={p._id} className="card bg-base-100 shadow-sm border">
            <figure className="h-40 overflow-hidden">
              <img
                src={p.foodImage || FALLBACK_IMG}
                onError={(e)=>{ e.currentTarget.src=FALLBACK_IMG; }}
                className="w-full h-full object-cover"
                alt={p.foodName}
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-base">{p.foodName}</h3>
              <p className="text-sm opacity-80">{p.restaurantName} • {p.location}</p>
              <p className="text-xs opacity-60 mt-1">
                Purchased: {new Date(p.createdAt).toLocaleString()}
              </p>

              <div className="card-actions justify-between mt-2">
                <Link to={`/reviews/${p.reviewId}`} className="btn btn-xs">View Details</Link>
                <button
                  onClick={() => cancelPurchase(p._id)}
                  className="btn btn-xs btn-error btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
