const express = require('express');
const router = express.Router();
const knowledgeGraphService = require('../services/knowledgeGraphService');

router.post('/nodes', async (req, res, next) => {
  try {
    const { text } = req.body;
    const result = await knowledgeGraphService.addNode(text);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/query', async (req, res, next) => {
  try {
    const { question } = req.body;
    const result = await knowledgeGraphService.queryGraph(question);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;