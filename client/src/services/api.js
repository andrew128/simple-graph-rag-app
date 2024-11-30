const { REACT_APP_API_URL } = process.env;

export const addNode = async (text) => {
  const response = await fetch(`${REACT_APP_API_URL}/kg/nodes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
};

export const queryGraph = async (question) => {
  const response = await fetch(`${REACT_APP_API_URL}/kg/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return response.json();
};