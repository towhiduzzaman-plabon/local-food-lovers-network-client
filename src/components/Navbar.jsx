// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { avatarFromUser } from '../utils/avatar';
import logo from '../assets/logo.png'; // <<— আপনা

export default function Navbar() {
  const { user, logout } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const avatar = avatarFromUser(user);

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="inline-flex items-center gap-2">
          <img
            src={logo}
            alt="Local Food Lovers"
            className="h-8 w-auto object-contain"
            // লোগো লোড না হলে fallback টেক্সট দেখাবে (accessibility ok)
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-xl font-bold hidden sm:inline">Local Food Lovers</span>
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal gap-2 px-1">
          <li>
            <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'active' : '')}>
              All Reviews
            </NavLink>
          </li>

          {user && <li><NavLink to="/add">Add Review</NavLink></li>}
          {user && <li><NavLink to="/my-reviews">My Reviews</NavLink></li>}
          {user && <li><NavLink to="/favorites">My Favorites</NavLink></li>}
          {user && <li><NavLink to="/purchases">My Purchases</NavLink></li>}

          {!user ? (
            <li><NavLink to="/login" className="btn btn-primary">Login</NavLink></li>
          ) : (
            <li>
              <div className="hidden md:flex items-center gap-2 mr-1">
                <span className="font-medium">{displayName}</span>
              </div>

              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost px-2">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = avatarFromUser({ displayName: user?.displayName, email: user?.email });
                    }}
                  />
                </summary>

                <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-60 p-3 shadow">
                  <li className="mb-2">
                    <div className="flex items-center gap-3 p-2 rounded bg-base-100">
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = avatarFromUser({ displayName: user?.displayName, email: user?.email });
                        }}
                      />
                      <div>
                        <div className="font-semibold leading-tight">{displayName}</div>
                        <div className="text-xs opacity-70">{user?.email}</div>
                      </div>
                    </div>
                  </li>

                  <li><NavLink to="/add">Add Review</NavLink></li>
                  <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
                  <li><NavLink to="/favorites">My Favorites</NavLink></li>
                  <li><NavLink to="/purchases">My Purchases</NavLink></li>
                  <li><NavLink to="/profile">View Profile</NavLink></li>
                  <li className="pt-1">
                    <button onClick={logout} className="text-error">Logout</button>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
