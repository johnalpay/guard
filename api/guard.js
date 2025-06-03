import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Missing accessToken' });
  }

  const variables = {
    is_shielded: true,
    session_id: uuidv4(),
    client_mutation_id: uuidv4(),
  };

  const params = new URLSearchParams();
  params.append('variables', JSON.stringify(variables));
  params.append('method', 'post');
  params.append('doc_id', '1477043292367183');
  params.append('access_token', accessToken);

  try {
    const response = await fetch(`https://graph.facebook.com/graphql?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
