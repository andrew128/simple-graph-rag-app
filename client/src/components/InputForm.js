import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const InputForm = ({ onSubmit, type }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          multiline
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={type === 'add' ? 'Enter your thoughts...' : 'Ask a question...'}
        />
        <Button variant="contained" type="submit">
          {type === 'add' ? 'Add to Graph' : 'Query'}
        </Button>
      </Stack>
    </form>
  );
};

export default InputForm;