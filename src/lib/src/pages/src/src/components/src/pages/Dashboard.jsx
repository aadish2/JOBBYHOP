import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard(){
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));

    async function loadProfile() {
      const s = (await supabase.auth.getSession()).data.session;
      if (s?.user) {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', s.user.id).single();
        if (!error) setProfile(data);
      }
    }
    loadProfile();

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <pre>{JSON.stringify(profile ?? session?.user ?? null, null, 2)}</pre>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
