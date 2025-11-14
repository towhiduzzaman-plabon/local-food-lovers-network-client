import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop';

export default function MyReviews(){
  const { user } = useAuth();
  const qc = useQueryClient();

// Fetch all reviews
  const { data } = useQuery({
    queryKey:['my-reviews', user?.email],
    queryFn: async()=> (await api.get('/reviews', { params: { q: '' } })).data
  });

  const mine = (data?.data || [])
    .filter(r => r.userEmail === user?.email)
    .map(r => ({
      ...r,
      foodImage: r.foodImage || r.image || r.photo || '',
      createdAt: r.createdAt || r.date
    }));

  const del = useMutation({
    mutationFn: async(id)=> (await api.delete(`/reviews/${id}`)).data,
    onSuccess: ()=> { toast.success('Deleted'); qc.invalidateQueries(['my-reviews', user?.email]); }
  });

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-semibold my-4">My Reviews</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mine.map(r => (
              <tr key={r._id}>
                <td className="flex items-center gap-2">
                  <img
                    src={r.foodImage || FALLBACK_IMG}
                    alt={r.foodName}
                    className="w-12 h-12 object-cover rounded"
                    referrerPolicy="no-referrer"
                    onError={(e)=>{ e.currentTarget.src = FALLBACK_IMG; }}
                  />
                  {r.foodName}
                </td>

                <td>{r.restaurantName}</td>

                <td>
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString()
                    : ''}
                </td>

                <td className="space-x-2">
                  <Link to={`/edit/${r._id}`} className="btn btn-xs">Edit</Link>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={()=> document.getElementById(`m-${r._id}`).showModal()}
                  >
                    Delete
                  </button>

                  <dialog id={`m-${r._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold">Confirm delete?</h3>
                      <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                          <button className="btn">Cancel</button>
                          <button
                            className="btn btn-error"
                            onClick={()=> del.mutate(r._id)}
                          >
                            Confirm
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
