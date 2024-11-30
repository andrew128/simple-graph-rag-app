import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ResponseDisplay = ({ response, relevantNodes }) => {
  if (!response) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Response:
      </Typography>
      <Typography paragraph>{response}</Typography>
      
      {relevantNodes && relevantNodes.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Relevant Context:
          </Typography>
          {relevantNodes.map((node, index) => (
            <Paper key={index} sx={{ p: 1, mt: 1, bgcolor: 'grey.100' }}>
              <Typography>{node.text}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ResponseDisplay;