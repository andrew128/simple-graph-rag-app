const { driver } = require('../config/neo4j');
const OpenAI = require('openai');
const config = require('../config/config');

const openai = new OpenAI({ apiKey: config.openai.apiKey });

class KnowledgeGraphService {
  async addNode(text) {
    const session = driver.session();
    try {
      // Generate embedding
      const embedding = await this.generateEmbedding(text);
      
      // Store node in Neo4j
      const result = await session.run(
        `
        CREATE (n:TextNode {
          text: $text,
          embedding: $embedding,
          createdAt: datetime()
        })
        RETURN n
        `,
        { text, embedding }
      );
      
      return result.records[0].get('n').properties;
    } finally {
      await session.close();
    }
  }

  async queryGraph(question) {
    const session = driver.session();
    try {
      // Generate embedding for question
      const embedding = await this.generateEmbedding(question);
      
      // Find similar nodes using vector similarity
      const result = await session.run(
        `
        MATCH (n:TextNode)
        WITH n, gds.similarity.cosine(n.embedding, $embedding) AS similarity
        ORDER BY similarity DESC
        LIMIT 3
        RETURN n, similarity
        `,
        { embedding }
      );
      
      // Extract relevant text for context
      const context = result.records.map(record => record.get('n').properties.text).join('\n');
      
      // Generate response using LLM
      const response = await this.generateResponse(question, context);
      
      return {
        response,
        relevantNodes: result.records.map(record => ({
          ...record.get('n').properties,
          similarity: record.get('similarity')
        }))
      };
    } finally {
      await session.close();
    }
  }

  async generateEmbedding(text) {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text
    });
    return response.data[0].embedding;
  }

  async generateResponse(question, context) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions based on the provided context."
        },
        {
          role: "user",
          content: `Context: ${context}\n\nQuestion: ${question}`
        }
      ]
    });
    return response.choices[0].message.content;
  }
}

module.exports = new KnowledgeGraphService();