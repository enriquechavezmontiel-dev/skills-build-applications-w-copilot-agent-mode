import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        fullName: 'Maya Thompson',
        email: 'maya.thompson@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        goals: ['Run a sub-50 10K', 'Improve VO2 max'],
      },
      {
        fullName: 'Ethan Rivera',
        email: 'ethan.rivera@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        goals: ['Maintain weekly mileage', 'Increase lower body strength'],
      },
      {
        fullName: 'Priya Shah',
        email: 'priya.shah@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        goals: ['Build consistency', 'Complete first 5K'],
      },
      {
        fullName: 'Noah Kim',
        email: 'noah.kim@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Improve mobility', 'Lose 4kg body fat'],
      },
    ]);

    const [maya, ethan, priya, noah] = users;

    const teams = await Team.insertMany([
      {
        name: 'Velocity Striders',
        city: 'Seattle',
        totalPoints: 620,
        createdBy: ethan._id,
        members: [ethan._id, maya._id],
      },
      {
        name: 'Core Collective',
        city: 'Austin',
        totalPoints: 455,
        createdBy: noah._id,
        members: [noah._id, priya._id],
      },
    ]);

    const [velocityStriders, coreCollective] = teams;

    await User.updateMany(
      { _id: { $in: [maya._id, ethan._id] } },
      { $set: { team: velocityStriders._id } },
    );
    await User.updateMany(
      { _id: { $in: [priya._id, noah._id] } },
      { $set: { team: coreCollective._id } },
    );

    await Activity.insertMany([
      {
        user: maya._id,
        activityType: 'Tempo Run',
        durationMinutes: 48,
        caloriesBurned: 510,
        performedAt: new Date('2026-07-20T06:30:00Z'),
      },
      {
        user: ethan._id,
        activityType: 'Hill Repeats',
        durationMinutes: 42,
        caloriesBurned: 560,
        performedAt: new Date('2026-07-21T07:15:00Z'),
      },
      {
        user: priya._id,
        activityType: 'Walk + Jog Intervals',
        durationMinutes: 35,
        caloriesBurned: 260,
        performedAt: new Date('2026-07-22T18:00:00Z'),
      },
      {
        user: noah._id,
        activityType: 'Strength Circuit',
        durationMinutes: 50,
        caloriesBurned: 430,
        performedAt: new Date('2026-07-23T12:20:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: ethan._id,
        team: velocityStriders._id,
        points: 340,
        rank: 1,
        weekOf: new Date('2026-07-20T00:00:00Z'),
      },
      {
        user: maya._id,
        team: velocityStriders._id,
        points: 280,
        rank: 2,
        weekOf: new Date('2026-07-20T00:00:00Z'),
      },
      {
        user: noah._id,
        team: coreCollective._id,
        points: 250,
        rank: 3,
        weekOf: new Date('2026-07-20T00:00:00Z'),
      },
      {
        user: priya._id,
        team: coreCollective._id,
        points: 205,
        rank: 4,
        weekOf: new Date('2026-07-20T00:00:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Beginner Base Builder',
        difficulty: 'beginner',
        focusArea: 'Cardio Endurance',
        durationMinutes: 30,
        equipment: ['Running shoes', 'Yoga mat'],
        recommendedFor: [priya._id],
        createdByCoach: 'Coach Elena Park',
      },
      {
        title: 'Threshold Progression Session',
        difficulty: 'intermediate',
        focusArea: 'Lactate Threshold',
        durationMinutes: 55,
        equipment: ['Running shoes', 'Heart-rate monitor'],
        recommendedFor: [maya._id, noah._id],
        createdByCoach: 'Coach Daniel Brooks',
      },
      {
        title: 'Power and Speed Complex',
        difficulty: 'advanced',
        focusArea: 'Explosive Strength',
        durationMinutes: 60,
        equipment: ['Kettlebell', 'Resistance bands'],
        recommendedFor: [ethan._id],
        createdByCoach: 'Coach Sofia Mendes',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete with users, teams, activities, leaderboard, and workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
