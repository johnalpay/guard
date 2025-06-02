import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const enableGuard = async () => {
    setMessage('Processing...');
    try {
      const res = await fetch('/api/guard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        color: 'white',
        padding: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '2rem',
          backgroundColor: '#222',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Facebook Profile Guard
        </h1>
        <input
          type="text"
          placeholder="Enter Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            marginBottom: '1rem',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={enableGuard}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            backgroundColor: '#3578e5',
            color: 'white',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Enable Guard
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        <a
          href="https://www.facebook.com/profile.php?id=61576955932718"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4da6ff', display: 'block', marginTop: '1.5rem', textDecoration: 'underline' }}
        >
          Follow Me on Facebook
        </a>
      </div>
    </div>
  );
          }
