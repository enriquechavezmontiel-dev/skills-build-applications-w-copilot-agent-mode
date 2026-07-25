import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || (codespaceName ? `https://${codespaceName}-5173.app.github.dev` : 'http://localhost:5173'),
  }),
);
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    baseUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API running on ${baseUrl}`);
});