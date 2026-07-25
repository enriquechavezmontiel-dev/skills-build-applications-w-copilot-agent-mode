import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', 'fullName')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .select('-__v')
      .lean();

    res.status(200).json({
      resource: 'leaderboard',
      count: entries.length,
      entries,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;
