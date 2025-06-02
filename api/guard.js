export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  const sessionId = '9b78191c-84fd-4ab6-b0aa-19b39f04a6bc';
  const clientMutationId = 'b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0';

  const variables = {
    "0": {
      is_shielded: true,
      session_id: sessionId,
      client_mutation_id: clientMutationId,
    }
  };

  const url = `https://graph.facebook.com/graphql?variables=${encodeURIComponent(
    JSON.stringify(variables)
  )}&method=post&doc_id=1477043292367183&query_name=IsShieldedSetMutation&strip_defaults=false&strip_nulls=false&locale=en_US&client_country_code=US&fb_api_req_friendly_name=IsShieldedSetMutation&fb_api_caller_class=IsShieldedSetMutation&access_token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url, { method: 'POST' });
    const result = await response.json();

    if (result && result.data) {
      return res.status(200).json({ message: 'Profile Guard Enabled Successfully!' });
    } else {
      return res.status(400).json({ message: 'Failed to enable guard. Invalid token or blocked request.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred while processing.' });
  }
}
