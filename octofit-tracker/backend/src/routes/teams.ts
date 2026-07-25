import { Router } from 'express';
import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'fullName email').populate('createdBy', 'fullName').select('-__v').lean();

    res.status(200).json({
      resource: 'teams',
      count: teams.length,
      items: teams,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default teamsRouter;
