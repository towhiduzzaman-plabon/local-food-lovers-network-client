export default function RatingStars({ value=0 }){
const full = Math.round(value);
return (
<div className="rating rating-sm">
{[1,2,3,4,5].map(n => (
<input key={n} type="radio" className="mask mask-star-2 bg-yellow-400" checked={n===full} readOnly />
))}
</div>
);
}