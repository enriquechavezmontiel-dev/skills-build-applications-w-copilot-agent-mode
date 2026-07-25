import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const logoUrl = new URL('../../../docs/octofitapp-small.png', import.meta.url).href;

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">
          <span className="navbar-brand d-flex align-items-center gap-2 mb-0 h1">
            <img src={logoUrl} alt="OctoFit logo" width="34" height="34" />
            OctoFit Tracker
          </span>
          <nav className="navbar-nav flex-row gap-3">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <section className="container pt-3">
          <div className="alert alert-info mb-0" role="alert">
            Define VITE_CODESPACE_NAME in .env.local when running in Codespaces. If it is unset, the app safely falls back to localhost API URLs.
          </div>
        </section>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
