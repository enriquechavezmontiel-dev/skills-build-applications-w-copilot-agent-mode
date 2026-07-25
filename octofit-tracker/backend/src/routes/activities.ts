import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'fullName email')
      .sort({ performedAt: -1 })
      .select('-__v')
      .lean();

    res.status(200).json({
      resource: 'activities',
      count: activities.length,
      items: activities,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;
