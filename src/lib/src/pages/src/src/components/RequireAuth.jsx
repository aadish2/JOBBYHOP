import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return null; // loading
  return session ? children : <Navigate to="/login" replace />;
}
