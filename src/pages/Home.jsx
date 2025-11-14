import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import banner from '../assets/banner.jpg';
import StatsRibbon from '../components/StatsRibbon';
import PromoMenu from '../components/PromoMenu';
import HowItWorks from '../components/HowItWorks';

// Home page component
export default function Home(){
  const { data: featured } = useQuery({
    queryKey:['featured'],
    queryFn: async()=> (await api.get('/reviews/featured')).data
  });


  return (
    <div className="space-y-10">
      {/*  Fixed-like banner for all devices using sticky */}
      <div className="relative overflow-hidden">
        <div className="sticky top-0 h-64 md:h-96">
          <img
            src={banner}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold">Find Great Local Eats</h1>
              <p>Real reviews from real food lovers.</p>
              <Link to="/reviews" className="btn btn-active btn-secondary mt-3">Explore Reviews</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Reviews Section */}
      <section className="container mx-auto px-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Top Rated Picks</h2>
          <Link to="/reviews" className="btn btn-outline btn-error">Show All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured?.map(r => <ReviewCard key={r._id} review={r} />)}
        </div>
      </section>

      <section className="container mx-auto px-3 grid md:grid-cols-2 gap-6">
        <div className="card bg-base-200 p-6">
          <h3 className="text-xl font-semibold mb-2">How it Works</h3>
          <p>Create an account, share a review, and favorite dishes you love.</p>
        </div>
        <div className="card bg-base-200 p-6">
          <h3 className="text-xl font-semibold mb-2">Community Values</h3>
          <p>Honesty, kindness, and love for local food scenes.</p>
        </div>
      </section>
       <HowItWorks />
       <PromoMenu />
      <StatsRibbon />
    </div>
  );
}
