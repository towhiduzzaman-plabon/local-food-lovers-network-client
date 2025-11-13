import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import AllReviews from '../pages/AllReviews';
import AddReview from '../pages/AddReview';
import EditReview from '../pages/EditReview';
import MyReviews from '../pages/MyReviews';
import MyFavorites from '../pages/MyFavorites';
import ReviewDetails from '../pages/ReviewDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../utils/PrivateRoute';
import Purchases from '../pages/Purchases';
import Profile from '../pages/Profile';


export default createBrowserRouter([
{
path: '/',
element: <App/>,
errorElement: <NotFound/>,
children: [
{ index: true, element: <Home/> },
{ path: 'reviews', element: <AllReviews/> },
{ path: 'reviews/:id', element: <ReviewDetails/> },
{ path: 'add', element: <PrivateRoute><AddReview/></PrivateRoute> },
{ path: 'edit/:id', element: <PrivateRoute><EditReview/></PrivateRoute> },
{ path: 'my-reviews', element: <PrivateRoute><MyReviews/></PrivateRoute> },
{ path: 'favorites', element: <PrivateRoute><MyFavorites/></PrivateRoute> },
{ path: '/purchases', element: <PrivateRoute><Purchases/></PrivateRoute> },
{ path: 'login', element: <Login/> },
{ path: 'register', element: <Register/> },
{ path: '/profile', element: <PrivateRoute><Profile/></PrivateRoute> }
]
}
]);