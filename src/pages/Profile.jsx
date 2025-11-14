import useAuth from '../hooks/useAuth';
import { avatarFromUser } from '../utils/avatar';


export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  const avatar = avatarFromUser(user);
  const name = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <div className="container mx-auto px-3 max-w-xl">
      <h1 className="text-2xl font-semibold my-4">My Profile</h1>

      <div className="card bg-base-200 p-6">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = avatarFromUser({ displayName: user?.displayName, email: user?.email });
            }}
          />
          <div>
            <div className="text-xl font-bold">{name}</div>
            <div className="opacity-70">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
