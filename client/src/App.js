import React, { useState } from 'react';
import { Container, Box, Tab, Tabs } from '@mui/material';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import { addNode, queryGraph } from './services/api';

function App() {
  const [tab, setTab] = useState(0);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddNode = async (text) => {
    try {
      setLoading(true);
      await addNode(text);
      setResponse({ response: 'Successfully added to knowledge graph!' });
    } catch (error) {
      console.error('Error adding node:', error);
      setResponse({ response: 'Error adding to knowledge graph' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async (question) => {
    try {
      setLoading(true);
      const result = await queryGraph(question);
      setResponse(result);
    } catch (error) {
      console.error('Error querying graph:', error);
      setResponse({ response: 'Error querying knowledge graph' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Add Knowledge" />
          <Tab label="Query Knowledge" />
        </Tabs>

        {tab === 0 ? (
          <InputForm onSubmit={handleAddNode} type="add" />
        ) : (
          <InputForm onSubmit={handleQuery} type="query" />
        )}

        <ResponseDisplay {...response} />
      </Box>
    </Container>
  );
}

export default App;