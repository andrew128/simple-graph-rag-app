require('dotenv').config();

module.exports = {
  neo4j: {
    uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
    user: 'neo4j',
    password: 'yourpassword'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  },
  server: {
    port: process.env.PORT || 3001
  }
};