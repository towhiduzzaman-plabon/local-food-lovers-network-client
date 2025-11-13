import { createContext, useEffect, useRef, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase.config';
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { api } from '../lib/axios';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // prevent duplicate /auth/session hits
  const lastIssuedTokenRef = useRef(null);
  const issuingRef = useRef(false);

  const issueSession = async (firebaseUser) => {
    if (!firebaseUser) return;
    const idToken = await firebaseUser.getIdToken(/* force */ true);
    if (lastIssuedTokenRef.current === idToken || issuingRef.current) return;

    issuingRef.current = true;
    try {
      await api.post('/auth/session', { idToken }); // httpOnly cookie
      lastIssuedTokenRef.current = idToken;
    } catch (e) {
      console.warn('JWT exchange failed (will retry on next token refresh):', e?.response?.data || e.message);
      // ❌ এখানে আর signOut করা হবে না
      lastIssuedTokenRef.current = null;
    } finally {
      issuingRef.current = false;
    }
  };

  const register = async ({ name, email, password, photoURL }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (name || photoURL) await updateProfile(res.user, { displayName: name || '', photoURL: photoURL || '' });
    await issueSession(res.user);
    setUser({ ...res.user });
    return res.user;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await issueSession(res.user);
    setUser({ ...res.user });
    return res.user;
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await issueSession(res.user);
    setUser({ ...res.user });
    return res.user;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (_) {}
    await signOut(auth).catch(() => {});
    lastIssuedTokenRef.current = null;
    setUser(null);
  };

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (u) => {
      try {
        if (u?.email) {
          await issueSession(u);
          setUser(u);
        } else {
          setUser(null);
          lastIssuedTokenRef.current = null;
        }
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const value = { user, loading, register, login, loginWithGoogle, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
