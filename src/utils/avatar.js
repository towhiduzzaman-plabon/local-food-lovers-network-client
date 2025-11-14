export function avatarFromUser(user) {
  const name = user?.displayName || user?.email?.split('@')[0] || 'User';
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff&size=128`;
  return user?.photoURL || fallback;
}
