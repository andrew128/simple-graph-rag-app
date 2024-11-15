const neo4j = require('neo4j-driver');
const config = require('./config');

const driver = neo4j.driver(
  config.neo4j.uri,
  neo4j.auth.basic(config.neo4j.user, config.neo4j.password)
);

// Test the connection
const testConnection = async () => {
    const session = driver.session();
    try {
      await session.run('RETURN 1');
      console.log('Neo4j connection successful');
    } catch (error) {
      console.error('Neo4j connection failed:', error);
    } finally {
      await session.close();
    }
  };
  
  module.exports = { driver, testConnection };
  