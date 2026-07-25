import { Router } from 'express';
import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find()
      .populate('recommendedFor', 'fullName fitnessLevel')
      .select('-__v')
      .lean();

    res.status(200).json({
      resource: 'workouts',
      count: workouts.length,
      items: workouts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;
