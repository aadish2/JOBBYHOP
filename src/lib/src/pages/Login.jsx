// src/pages/Login.jsx
import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {

        redirectTo: window.location.origin + '/dashboard'
      }
    });

    if (error) {
      console.error('Google login error', error);
      alert(error.message || 'Login error');
      return;
    }

    if (data?.url) window.location.href = data.url;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <button onClick={handleGoogle}>Sign in with Google</button>
    </div>
  );
}
