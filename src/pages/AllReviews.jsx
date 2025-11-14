import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { useState, useMemo } from 'react';
import ReviewCard from '../components/ReviewCard';

const LIMIT = 12;

export default function AllReviews(){
  const [q, setQ] = useState('');

  const fetchPage = async ({ pageParam = 1, queryKey }) => {
    const [, search] = queryKey;
    const res = await api.get('/reviews', { params: { q: search, page: pageParam, limit: LIMIT }});
    return res.data; // { total, page, limit, data: [...] }
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['reviews', q],
    queryFn: fetchPage,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + (p?.data?.length || 0), 0);
      return loaded < (lastPage?.total || 0) ? (lastPage.page + 1) : undefined;
    }
  });

  // Flattened list of reviews
  const items = useMemo(
    () => (data?.pages || []).flatMap(p => p?.data || []),
    [data]
  );

  return (
    <div className="container mx-auto px-3">
      <div className="join justify-center w-full my-4">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search by food name"
          className="input input-bordered join-item min-w-96"
        />
        <button
          className="btn btn-soft btn-success"
          onClick={()=> refetch()}
        >
          Search
        </button>
      </div>

      {isLoading && <div className="py-10 text-center">Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(r => <ReviewCard key={r._id} review={r} />)}
      </div>

      {/* See more */}
      <div className="flex justify-center my-6">
        {hasNextPage ? (
          <button
            className={`btn btn-info ${isFetchingNextPage ? 'loading' : ''}`}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading…' : 'See more'}
          </button>
        ) : (
          items.length > 0 && <span className="opacity-60 text-sm">No more results</span>
        )}
      </div>
    </div>
  );
}
