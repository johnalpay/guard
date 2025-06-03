import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const res = await fetch('/api/guard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken: token }),
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Enable Facebook Profile Guard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste your Facebook Access Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Processing...' : 'Enable Guard'}
        </button>
      </form>

      {response && (
        <pre style={{ marginTop: 20, backgroundColor: '#eee', padding: 10 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
            }
