import { Link } from 'react-router-dom';
export default function NotFound(){
return (
<div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
<img src="/404.png" className="w-64 mb-6"/>
<h1 className="text-3xl font-bold mb-2">Page not found</h1>
<Link to="/" className="btn btn-primary">Back to Home</Link>
</div>
);
}