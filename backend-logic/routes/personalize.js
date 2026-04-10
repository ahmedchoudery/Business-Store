const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Personalization = require('../models/Personalization');
const { personalizePortfolio } = require('../services/personalizePortfolio');

const router = express.Router();

async function tryEnsureDb() {
  if (mongoose.connection.readyState === 1) return true;

  await connectDB();
  return mongoose.connection.readyState === 1;
}

router.post('/', async (req, res) => {
  const { input, portfolio } = req.body || {};

  if (!portfolio?.profile || !Array.isArray(portfolio?.projects) || !Array.isArray(portfolio?.skillGroups)) {
    return res.status(400).json({
      success: false,
      message: 'Portfolio snapshot is required for personalization.',
    });
  }

  try {
    const result = await personalizePortfolio({ input, portfolio });
    let sessionId = '';

    try {
      const hasDb = await tryEnsureDb();
      if (hasDb) {
        sessionId = crypto.randomUUID();
        result.output.sessionId = sessionId;
        await Personalization.create({
          sessionId,
          input: result.input,
          output: result.output,
        });
      }
    } catch (dbError) {
      console.error('[PERSONALIZE] Unable to persist session:', dbError.message);
    }

    res.status(201).json({
      success: true,
      data: {
        input: result.input,
        output: {
          ...result.output,
          sessionId,
        },
      },
    });
  } catch (error) {
    console.error('[PERSONALIZE] Failed to personalize portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Could not personalize the portfolio at this time.',
    });
  }
});

router.get('/:sessionId', async (req, res) => {
  try {
    const hasDb = await tryEnsureDb();
    if (!hasDb) {
      return res.status(503).json({
        success: false,
        message: 'Saved recruiter sessions are unavailable right now.',
      });
    }

    const personalization = await Personalization.findOne({ sessionId: req.params.sessionId }).lean();
    if (!personalization) {
      return res.status(404).json({
        success: false,
        message: 'Saved recruiter session not found.',
      });
    }

    res.json({
      success: true,
      data: {
        input: personalization.input,
        output: personalization.output,
      },
    });
  } catch (error) {
    console.error('[PERSONALIZE] Failed to fetch session:', error);
    res.status(500).json({
      success: false,
      message: 'Could not load the saved recruiter session.',
    });
  }
});

module.exports = router;
