# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey enriquechavezmontiel-dev!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/enriquechavezmontiel-dev/skills-build-applications-w-copilot-agent-mode/issues/1)

## OctoFit Tracker Setup Status

The OctoFit Tracker multi-tier application has been initialized under `octofit-tracker/`.

### Project structure

- `octofit-tracker/frontend`: React + Vite presentation tier
- `octofit-tracker/backend`: Node.js + Express + TypeScript logic tier
- MongoDB data tier via Mongoose models in backend

### Ports

- Frontend: `5173`
- Backend API: `8000`
- MongoDB: `27017`

### Backend API URL behavior

The API base URL is environment-aware:

- Codespaces: `https://$CODESPACE_NAME-8000.app.github.dev`
- Local: `http://localhost:8000`

### Implemented API routes

- `/api/users/`
- `/api/teams/`
- `/api/activities/`
- `/api/leaderboard/`
- `/api/workouts/`

### Data tier setup

MongoDB + Mongoose are configured to use `octofit_db` on local port `27017`.

Mongoose models created:

- Users
- Teams
- Activities
- Leaderboard
- Workouts

Seed script:

- `octofit-tracker/backend/src/scripts/seed.ts`
- Includes the message: `Seed the octofit_db database with test data`
- Populates realistic sample data across all collections

### Verification completed

- Backend build succeeds.
- Seed script runs successfully.
- `curl` verification confirms data is returned by:
	- `/api/users/`
	- `/api/activities/`

