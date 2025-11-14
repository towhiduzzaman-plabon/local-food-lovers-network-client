import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'react-hot-toast';

// Fallback image URL
const FALLBACK =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop';

export default function MyFavorites() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => (await api.get('/favorites/me')).data,
  });
// Mutation to delete a favorite
  const del = useMutation({
    mutationFn: async (id) => (await api.delete(`/favorites/${id}`)).data,
    onSuccess: () => {
      toast.success('Removed');
      qc.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-semibold my-4">My Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((f) => {
          const src = f.foodImage || FALLBACK;
          return (
            <div key={f._id} className="card bg-base-100 shadow">
              <figure className="h-48">
                <img
                  className="w-full h-full object-cover"
                  src={src}
                  alt={f.foodName}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK;
                  }}
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{f.foodName}</h3>
                <p>{f.restaurantName}</p>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => del.mutate(f._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
