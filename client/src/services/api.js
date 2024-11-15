const API_BASE_URL = 'http://localhost:3001/api';

export const addNode = async (text) => {
  const response = await fetch(`${API_BASE_URL}/kg/nodes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
};

export const queryGraph = async (question) => {
  const response = await fetch(`${API_BASE_URL}/kg/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return response.json();
};